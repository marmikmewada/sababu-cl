import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import supabase from "../../../supabase";

const MemberContext = createContext();

const initialState = {
  isLoading: false,
  members: [],
  events: [],
  currentMember: {},
  selectedMember: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    //All members
    case "members/loaded":
      return {
        ...state,
        isLoading: false,
        members: action.payload,
      };

    //One member loaded
    case "member/loaded":
      return {
        ...state,
        isLoading: false,
        currentMember: action.payload,
      };

    //One member selected
    case "member/selected":
      return {
        ...state,
        isLoading: false,
        selectedMember: action.payload,
      };

    //New member created
    case "member/created":
      const newMembers = Array.isArray(state.members)
        ? [...state.members, action.payload]
        : action.payload;
      return {
        ...state,
        isLoading: false,
        members: newMembers,
        currentMember: action.payload,
      };

    //
    case "member/edited":
      const editedMemberIndex = state.members.findIndex(
        (members) => members.id === action.payload.id
      );
      if (editedMemberIndex !== -1) {
        // Create a copy of the fetched customers array
        const updatedMembers = [...state.members];
        // Replace the edited customer with the updated data
        updatedMembers[editedMemberIndex] = action.payload;
        // Return the updated state
        return {
          ...state,
          isLoading: false,
          members: updatedMembers,
          selectedMember: action.payload,
        };
      } else {
        console.warn("Selected member not found:", action.payload.id);
        return state;
      }

    //Delete member
    case "member/deleted":
      const updatedMembers = state.members.filter(
        (member) => member.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        members: updatedMembers,
      };

    //

    // Add a new action type for deleting a dependent
    case "dependent/created":
      return {
        ...state,
        isLoading: false,
        dependents: [...state.dependents, action.payload],
      };

    // Add a new action type for deleting a dependent
    case "dependent/edited":
      const { index, dependent } = action.payload;
      const updatedDependents = [...state.dependents];
      updatedDependents[index] = dependent;
      return {
        ...state,
        dependents: updatedDependents,
      };

    case "dependent/deleted":
      const dependentsUpdated = state.currentMember.dependents.filter(
        (dependent) => dependent.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        currentMember: {
          ...state.currentMember,
          dependents: dependentsUpdated,
        },
      };

    //Events members
    case "events/loaded":
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };

    //One member loaded
    case "event/loaded":
      return {
        ...state,
        isLoading: false,
        currentEvent: action.payload,
      };

    //New member created
    case "event/created":
      return {
        ...state,
        isLoading: false,
        currentEvent: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      console.log("Unkown action type", action.type);
      return state;
  }
};

const MemberProvider = ({ children }) => {
  const [
    { members, events, selectedMember, currentMember, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getCurrentMember = useCallback(async function (user_id) {
    dispatch({ type: "loading", payload: true });
    try {
      const { data, error } = await supabase
        .from("members")
        .select(
          `*, contacts(*), dependents(*), reference(*), spouse(*), membership(*)`
        )
        .eq("id", user_id)
        .single();

      // console.log(data);

      if (!error && data) dispatch({ type: "member/loaded", payload: data });
    } catch (error) {
      console.log("Error fetching current user data: ", error.message);
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      dispatch({ type: "rejected", payload: false });
    }
  }, []);

  //
  const getMembers = useCallback(async function getMembers() {
    dispatch({ type: "loading", payload: true });
    try {
      const { data, error } = await supabase
        .from("members")
        .select(`*, contacts(*), dependents(*), reference(*), spouse(*)`);

      // console.log(data);

      if (!error && data) dispatch({ type: "members/loaded", payload: data });
    } catch (error) {
      console.log("Error fetching current all members: ", error.message);
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      dispatch({ type: "rejected", payload: false });
    }
  }, []);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  // Insert data
  const createMember = async (newCustomer) => {
    dispatch({ type: "loading" });

    const { members, contacts, dependents, reference, spouse } = newCustomer;

    //Create a
    try {
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

      //Insert spouse with customer_id
      const spouseWithMemberId = { ...spouse, member_id: insertedId };
      const { error: spouseError } = await supabase
        .from("spouse")
        .insert([spouseWithMemberId]);
      if (spouseError) throw spouseError;

      //Insert reference with customer_id
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
      // console.log(dependentsWithMemberId);

      const { error: dependentsInsertionError } = await supabase
        .from("dependents")
        .insert(dependentsWithMemberId);

      if (dependentsInsertionError) {
        throw dependentsInsertionError;
      }

      // Dispatch action to update state with inserted data
      dispatch({
        type: "member/created",
        payload: {
          members,
          contacts: contactsWithMemberId,
          spouse: spouseWithMemberId,
          reference: referenceWithMemberId,
          dependents: dependentsWithMemberId,
        },
      });

      // fetchCustomersOnAdd();
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  //
  const editMember = useCallback(async function (id, formData) {
    dispatch({ type: "loading", payload: true });

    const { member } = formData;

    console.log("FormData:", member); // Add this line to log formData

    try {
      // Check if formData is an array
      if (Array.isArray(formData)) {
        // Handle updating dependents
        // Assuming supabase is your Supabase client instance
        const { data, error } = await supabase
          .from("members")
          .update({ member })
          .eq("id", id)
          .select();

        if (error) throw error;

        dispatch({ type: "dependent/edited", payload: data });
      } else {
      }
    } catch (error) {
      console.log("Error updating dependents:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }, []);

  // Function to delete a member
  const deleteMember = async (id) => {
    console.log(id);
    dispatch({ type: "loading", payload: true });
    try {
      // Perform deletion operation, assuming supabase is your Supabase client instance
      await supabase.from("members").delete().eq("id", id);
      dispatch({ type: "member/deleted", payload: id }); // Dispatch action to update state
    } catch (error) {
      console.log("Error deleting member:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  // Define your context function
  const createDependent = async (memberId, newDependentData) => {
    dispatch({ type: "loading" });

    try {
      // Insert the new dependent record with member_id
      const newDependent = { ...newDependentData, member_id: memberId };
      console.log(newDependent);
      const { data: insertedDependent, error: dependentError } = await supabase
        .from("dependents")
        .insert([newDependent])
        .single();

      if (dependentError) throw dependentError;

      // Dispatch action to update state with inserted dependent
      dispatch({ type: "dependent/created", payload: insertedDependent });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      throw error; // Rethrow the error to be caught by the component
    } finally {
      dispatch({ type: "loading", payload: false }); // Reset loading state
    }
  };

  // Function to delete a dependent
  const deleteDependent = async (memberId, dependentId) => {
    console.log(memberId, dependentId);
    dispatch({ type: "loading", payload: true });
    try {
      // Perform deletion operation, assuming supabase is your Supabase client instance
      await supabase
        .from("dependents")
        .delete()
        .eq("id", dependentId)
        .eq("member_id", memberId);
      dispatch({ type: "dependent/deleted", payload: dependentId }); // Dispatch action to update state
    } catch (error) {
      console.log("Error deleting dependent:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  //Edit member data
  const editDependent = useCallback(async function (id, formData) {
    dispatch({ type: "loading", payload: true });

    try {
      // Ensure formData is an array of objects representing dependents
      if (!Array.isArray(formData)) {
        throw new Error("FormData must be an array of dependents");
      }

      // Assuming supabase is your Supabase client instance
      const { data, error } = await supabase
        .from("dependents")
        .upsert(formData, { returning: "minimal" })
        .eq("member_id", id)
        .select();

      if (error) {
        throw error;
      }

      dispatch({ type: "dependent/edited", payload: data });
    } catch (error) {
      console.log("Error updating dependents:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }, []);

  //
  return (
    <MemberContext.Provider
      value={{
        isLoading,
        members,
        eventsData: events,
        currentMember,
        selectedMember,
        getCurrentMember,
        createMember,
        editMember,
        deleteMember,
        createDependent,
        editDependent,
        deleteDependent,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

//
const useMembers = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("UseMember must be used within a UseMemberProvider");
  }

  return context;
};

export { useMembers, MemberProvider };
