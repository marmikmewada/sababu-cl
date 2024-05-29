// import {
//   createContext,
//   useCallback,
//   useContext,
//   useReducer,
// } from "react";
// import supabase from "../../../supabase";
// import { useAuth } from "./UserContext";

// const EventsContext = createContext();

// const initialState = {
//   isLoading: false,
//   events: [],
//   myEvents: [],
//   event: {},
//   currentEvent: {},
//   selectedEvent: {},
//   error: "",
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "loading":
//       return {
//         ...state,
//         isLoading: action.payload,
//       };

//     //All Events members
//     case "events/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         events: action.payload,
//       };

//     //All Events members
//     case "eventsByUser/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         myEvents: action.payload,
//       };

//     //One member loaded
//     case "event/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         currentEvent: action.payload,
//       };

//     //New member created
//     case "event/loaded":
//       return {
//         ...state,
//         isLoading: false,
//         currentEvent: action.payload,
//       };

//     //New member created
//     case "event/updated":
//       return {
//         ...state,
//         isLoading: false,
//         currentEvent: action.payload,
//       };
//     //New member created
//     case "event/deleted":
//       return {
//         ...state,
//         isLoading: false,
//         currentEvent: action.payload,
//       };

//     case "rejected":
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };

//     default:
//       console.log("Unkown action type", action.type);
//       return state;
//   }
// };

// const EventsProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [
//     { events, myEvents, selectedEvent, currentEvent, isLoading },
//     dispatch,
//   ] = useReducer(reducer, initialState);

//   //Create Events
//   // Function to create a new event
//   const createEvent = async (eventData) => {
//     // const {user} = useAuth() // Get the currently logged-in user

//     if (!user) {
//       console.error("User is not authenticated");
//       return;
//     }

//     try {
//       // Add the user's information to the event data
//       const newEventData = {
//         ...eventData,
//         auth_id: user.id, // Set auth_id to the logged-in user's ID
//         owner_id: user.id, // Set owner_id to the logged-in user's ID
//       };

//       console.log(newEventData);

//       // Insert the new event into the events table
//       const { data: newEvent, error } = await supabase
//         .from("events")
//         .insert(newEventData);

//       if (error) throw error;

//       console.log("New event created:", newEvent);

//       // Fetch events again to update state with the latest data
//       getEvents();
//       getMyEvents();
//     } catch (error) {
//       console.error("Error creating event:", error.message);
//     }
//   };

//   //Create Events
//   const getEvents = useCallback(async () => {
//     dispatch({ type: "loading", payload: true });

//     //Create a
//     try {
//       const { data: events, error: eventError } = await supabase
//         .from("events")
//         .select(`"*", signups(*)`);
//       // .select();
//       if (eventError) throw eventError;

//       // console.log(events);

//       // Dispatch action to update state with inserted data
//       dispatch({
//         type: "events/loaded",
//         payload: events,
//       });

//       // fetchCustomersOnAdd();
//     } catch (error) {
//       dispatch({ type: "rejected", payload: error.message });
//     }
//   }, []);

//   // Function to fetch events created by a specific user ID
//   const getMyEvents = useCallback(
//     async (userId) => {
//       dispatch({ type: "loading", payload: true });

//       try {
//         // Fetch events created by the specified user ID
//         const { data: myEvents, error: eventError } = await supabase
//           .from("events")
//           .select(`"*", signups(*)`)
//           .eq("auth_id", userId); // Filter events by the specified user ID
//         if (eventError) throw eventError;

//         console.log(myEvents);

//         // Dispatch action to update state with fetched events
//         dispatch({
//           type: "eventsByUser/loaded",
//           payload: myEvents,
//         });

//         getEvents();
//       } catch (error) {
//         dispatch({ type: "rejected", payload: error.message });
//       }
//     },
//     [dispatch, getEvents]
//   );

//   //Select event
//   const getEventById = useCallback(async (eventId) => {
//     dispatch({ type: "loading", payload: true });

//     try {
//       const { data: event, error } = await supabase
//         .from("events")
//         .select(`"*", signups(*)`)
//         .eq("id", eventId);
//       if (error) throw error;

//       dispatch({
//         type: "event/loaded",
//         payload: event[0], // Assuming event ID is unique, so we take the first element
//       });
//     } catch (error) {
//       dispatch({ type: "rejected", payload: error.message });
//     }
//   }, []);

//   //Update events
//   const updateEventById = useCallback(async (eventId, eventData) => {
//     dispatch({ type: "loading", payload: true });

//     try {
//       const { data: updatedEvent, error } = await supabase
//         .from("events")
//         .update(eventData)
//         .eq("id", eventId);
//       if (error) throw error;

//       dispatch({
//         type: "event/updated",
//         payload: updatedEvent[0], // Assuming event ID is unique, so we take the first element
//       });
//     } catch (error) {
//       dispatch({ type: "rejected", payload: error.message });
//     }
//   }, []);

//   //Delete an event
//   const deleteEventById = useCallback(async (id) => {
//     dispatch({ type: "loading", payload: true });

//     try {
//       const { error } = await supabase.from("events").delete().eq("id", id);
//       if (error) throw error;

//       dispatch({ type: "event/deleted", payload: id });
//     } catch (error) {
//       dispatch({ type: "rejected", payload: error.message });
//     }
//   }, []);

//   //
//   return (
//     <EventsContext.Provider
//       value={{
//         isLoading,
//         events,
//         myEvents,
//         createEvent,
//         getEvents,
//         getMyEvents,
//         getEventById,
//         updateEventById,
//         deleteEventById,
//       }}
//     >
//       {children}
//     </EventsContext.Provider>
//   );
// };

// //
// const useEvents = () => {
//   const context = useContext(EventsContext);

//   if (!context) {
//     throw new Error("UseEvents must be used within a UseEventsProvider");
//   }

//   return context;
// };

// export { useEvents, EventsProvider };
