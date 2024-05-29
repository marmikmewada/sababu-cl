// MembersContext.js

import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import supabase from "../supabase";

const CustomersContext = createContext();

//Define initialState
const initialState = {
  fetchedCustomers: [],
  isLoading: false,
  currentCustomer: {},
  selectedCustomer: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "customers/loaded":
      return {
        ...state,
        isLoading: false,
        fetchedCustomers: action.payload,
      };

    case "customer/loaded":
      return {
        ...state,
        isLoading: false,
        selectedCustomer: action.payload,
      };

    case "customer/created":
      const newCustomers = Array.isArray(state.customers)
        ? [...state.customers, action.payload]
        : [action.payload];
      return {
        ...state,
        isLoading: false,
        customers: newCustomers,
        currentCustomer: action.payload,
      };

    //   return state;
    case "customer/edited":
      // Find the index of the customer to be edited
      const editedCustomerIndex = state.fetchedCustomers.findIndex(
        (customer) => customer.id === action.payload.id
      );

      if (editedCustomerIndex !== -1) {
        // Create a copy of the fetched customers array
        const updatedCustomers = [...state.fetchedCustomers];
        // Replace the edited customer with the updated data
        updatedCustomers[editedCustomerIndex] = action.payload;
        // Return the updated state
        return {
          ...state,
          isLoading: false,
          fetchedCustomers: updatedCustomers,
          selectedCustomer: action.payload,
        };
      } else {
        console.warn("Edited customer not found:", action.payload.id);
        return state;
      }

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
};

const CustomersProvider = ({ children }) => {
  const [{ fetchedCustomers, selectedCustomer, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  // Fetch data
  const fetchData = useCallback(async () => {
    dispatch({ type: "loading" });

    try {
      let { data: customers, error } = await supabase
        .from("members")
        .select(`"*", contacts(*),dependents(*),reference(*),spouse(*)`);

      // console.log(customers);

      if (error) {
        throw new Error(`Error fetching data from Supabase: ${error.message}`);
      }
      dispatch({
        type: "customers/loaded",
        payload: customers,
      });
      // console.log("Fetched data:", customers); // Log fetched data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  //Fetch data on creation
  const fetchCustomersOnAdd = useCallback(() => {
    async function fetchCustomers() {
      dispatch({ type: "loading" });

      try {
        let { data: customers, error } = await supabase
          .from("members")
          .select("*");

        if (error) {
          throw new Error(
            `Error fetching data from Supabase: ${error.message}`
          );
        }

        dispatch({
          type: "customers/loaded",
          payload: customers,
        });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchCustomers();
  }, [dispatch]);

  // Fetch data from API and set selected customer

  const fetchSelectedCustomer = useCallback(async (id) => {
    dispatch({ type: "loading" });

    try {
      const { data: customer, error } = await supabase
        .from("members")
        .select(`"*"`)
        .eq("id", id);
      //
      if (error) {
        throw new Error(`Error fetching data from Supabase: ${error.message}`);
      }

      // console.log(customer);
      dispatch({
        type: "customer/loaded",
        payload: customer,
      });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "Cannot fetch the selected customer",
      });
    }
  }, []);

  //   [selectedCustomer.id]
  // );

  // Insert data
  const insertData = async (newCustomer) => {
    dispatch({ type: "loading" });

    const { members, contacts, dependents, reference, spouse } = newCustomer;

    // console.log(members, contacts);

    //

    try {
      // Insert members
      const { data: insertedData, error: customersError } = await supabase
        .from("members")
        .insert([members])
        .select();
      if (customersError) throw customersError;

      console.log(insertedData);

      const insertedId = insertedData[0].id;

      //Insert contacts with customer_id
      const contactsWithMemberId = { ...contacts, member_id: insertedId };
      const { error: contactsError } = await supabase
        .from("contacts")
        .insert([contactsWithMemberId]);

      if (contactsError) throw contactsError;

      // // Insert spouse with customer_id
      const spouseWithMemberId = { ...spouse, member_id: insertedId };
      const { error: spouseError } = await supabase
        .from("spouse")
        .insert([spouseWithMemberId]);
      if (spouseError) throw spouseError;

      // // // Insert reference with customer_id
      const referenceWithMemberId = { ...reference, member_id: insertedId };
      const { error: referenceError } = await supabase
        .from("reference")
        .insert([referenceWithMemberId]);
      if (referenceError) throw referenceError;

      //Insert Dependents
      const dependentsWithMemberId = dependents.map((dependent) => ({
        ...dependent,
        member_id: insertedId,
      }));

      console.log(dependentsWithMemberId);

      const { error: dependentsInsertionError } = await supabase
        .from("dependents")
        .insert(dependentsWithMemberId);

      if (dependentsInsertionError) {
        throw dependentsInsertionError;
      }

      // // Insert dependents with the customer_id
      // const dependentsWithMemberId = [];
      // for (const dependent of dependents) {
      //   const addMemberIdToDependent = {
      //     ...dependent,
      //     member_id: insertedId,
      //   };
      //   console.log(addMemberIdToDependent);
      //   dependentsWithMemberId.push(addMemberIdToDependent);
      // }

      // const { error: dependentsError } = await supabase
      //   .from("dependents")
      //   .insert([dependentsWithMemberId]);
      // if (dependentsError) throw dependentsError;

      // Dispatch action to update state with inserted data
      dispatch({
        type: "customer/created",
        payload: {
          members,
          contacts: contactsWithMemberId,
          spouse: spouseWithMemberId,
          reference: referenceWithMemberId,
          dependents: dependentsWithMemberId,
        },
      });

      fetchCustomersOnAdd();
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  // Insert data
  // Edit data
  const editData = async (id, updatedCustomer) => {
    dispatch({ type: "loading" });

    const { contacts, customers, dependents, spouse, reference } =
      updatedCustomer;

    console.log(updatedCustomer);

    try {
      // Update customer data
      const { data: updatedCustomerData, error: updateError } = await supabase
        .from("customers")
        .update(customers)
        .match({ id: id });

      if (updateError) throw updateError;

      // Update contacts data
      const { error: contactsError } = await supabase
        .from("contacts")
        .upsert(contacts, { returning: "minimal" })
        .eq("customer_id", customers.id);

      if (contactsError) throw contactsError;

      // Update spouse data
      const { error: spouseError } = await supabase
        .from("spouse")
        .upsert(spouse, { returning: "minimal" })
        .eq("customer_id", customers.id);

      if (spouseError) throw spouseError;

      // Update reference data
      const { error: referenceError } = await supabase
        .from("reference")
        .upsert(reference, { returning: "minimal" })
        .eq("customer_id", customers.id);

      if (referenceError) throw referenceError;

      // Update dependents data
      const { error: dependentsError } = await supabase
        .from("dependents")
        .upsert(dependents, { returning: "minimal" })
        .eq("customer_id", customers.id);

      if (dependentsError) throw dependentsError;

      // Dispatch action to update state with updated data
      dispatch({
        type: "customer/edited",
        payload: updatedCustomerData[0], // Assuming Supabase returns the updated customer data
      });

      fetchCustomersOnAdd(); // Fetch updated data
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  // Call fetchCustomerData function

  return (
    <CustomersContext.Provider
      value={{
        isLoading,
        fetchedCustomers,
        selectedCustomer,
        insertData,
        fetchData,
        fetchSelectedCustomer,
        editData,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

const useCustomersContext = () => {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error(
      "useCustomersContext must be used within a CustomersProvider"
    );
  }

  return context;
};

export { CustomersProvider, useCustomersContext };
