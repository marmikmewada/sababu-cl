import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// API URL
const BASE_URL = "http://0.0.0.0:5170";

//Create context
const MembersContext = createContext();

//Define initialState
const initialState = {
  customers: [],
  teams: [],
  isLoading: false,
  currentCustomer: {},
  selectedCustomer: {},
  error: "",
};

//Reducer function
function reducer(state = initialState, action) {
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
        customers: action.payload,
      };

    case "teams/loaded":
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
      };

    case "customer/loaded":
      return {
        ...state,
        isLoading: false,
        currentCustomer: action.payload,
      };

    case "customer/selected":
      return {
        ...state,
        isLoading: false,
        selectedCustomer: action.payload,
      };

    case "customer/created":
      const newCustomer = Array.isArray(state.customers)
        ? [...state.customers, action.payload]
        : [action.payload];
      return {
        ...state,
        isLoading: false,
        customers: newCustomer,
        currentCustomer: action.payload,
      };

    case "customer/deleted":
      return {
        ...state,
        isLoading: false,
        customers: state.customers.customers?.filter(
          (customer) => customer.id !== action.payload
        ),
        currentCustomer: {},
      };

    //   return state;
    case "customer/edited":
      const customers = state.customers;
      const customer = customers?.customers?.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (customer !== -1) {
        return {
          ...state,
          isLoading: false,
          customers: state.customers?.customers?.map((customer) =>
            customer.id === action.payload.id ? action.payload : customer
          ),
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
  //
}

// Create provider component
function MembersProvider({ children }) {
  const [
    { customers, teams, isLoading, currentCustomer, selectedCustomer, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Fetch data from API
  useEffect(function () {
    async function fetchCustomers() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/db`);
        const data = await res.json();

        dispatch({ type: "customers/loaded", payload: data });
        dispatch({ type: "teams/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      } finally {
      }
    }

    fetchCustomers();
  }, []); // Only trigger the effect when customers change

  const fetchCustomersOnAdd = useCallback(() => {
    async function fetchCustomers() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/db`);
        const data = await res.json();

        dispatch({ type: "customers/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchCustomers();
  }, [dispatch]);

  // Get a member
  const getCustomer = useCallback(
    async function getCustomer(id) {
      if (Number(id) === currentCustomer?.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/customers/${id}`);
        const data = await res.json();

        dispatch({ type: "customer/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading customer data...",
        });
      }
    },
    [currentCustomer.id]
  ); // No dependencies needed for getCustomer

  //Get selected customer
  // Fetch data from API and set selected customer
  const fetchSelected = useCallback(
    async function fetchSelected(id) {
      if (Number(id) === selectedCustomer.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/customers/${id}`);
        const data = await res.json();

        dispatch({ type: "customer/selected", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "Cannot fetch the selected customer",
        });
      }
    },
    [selectedCustomer.id]
  );

  // Create a member
  async function createCustomer(newCustomer) {
    dispatch({ type: "loading" });

    // dispatch({ type: "create_customer" });
    try {
      const res = await fetch(`${BASE_URL}/customers`, {
        method: "POST",
        body: JSON.stringify(newCustomer),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "customer/created", payload: data });

      //
      fetchCustomersOnAdd();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There an error creating the member",
      });
    }
  }

  // Delete the member
  async function deleteCustomer(id) {
    dispatch({ type: "loading" });

    console.log(id);

    try {
      await fetch(`${BASE_URL}/customers/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "customer/deleted", payload: id });
      fetchCustomersOnAdd();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the customer...",
      });
    }
  }

  // Edit selected member
  async function editCustomer(id, selectedCustomer) {
    dispatch({ type: "loading" });

    console.log(id);

    try {
      const res = await fetch(`${BASE_URL}/customers/${selectedCustomer.id}`, {
        method: "PUT",
        body: JSON.stringify(selectedCustomer),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "customer/edited", payload: data });

      fetchCustomersOnAdd();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the customer...",
      });
    }
  }

  // Edit current or own own account
  async function editOwnAccount(id, currentCustomer) {
    dispatch({ type: "loading" });

    console.log(id);

    try {
      const res = await fetch(`${BASE_URL}/customers/${currentCustomer.id}`, {
        method: "PUT",
        body: JSON.stringify(currentCustomer),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "customer/edited", payload: data });

      fetchCustomersOnAdd();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the customer...",
      });
    }
  }

  //
  return (
    <MembersContext.Provider
      value={{
        customers,
        teams,
        isLoading,
        currentCustomer,
        selectedCustomer,
        getCustomer,
        error,
        createCustomer,
        deleteCustomer,
        editCustomer,
        editOwnAccount,
        fetchSelected,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

function useMembersContext() {
  const context = useContext(MembersContext);

  if (context === undefined) {
    throw new Error("useMemberContext must be used a MemberProvider");
  }

  return context;
}

export { MembersProvider, useMembersContext };

export default MembersContext;
