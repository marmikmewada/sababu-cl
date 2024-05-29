// import React, { createContext, useContext, useEffect, useReducer } from "react";
// import supabase from "../supabase";

// const UserContext = createContext();

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const actionTypes = {
//   LOGIN: "LOGIN",
//   LOGOUT: "LOGOUT",
//   FETCH_USER: "FETCH_USER",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOGIN:
//       return {
//         ...state,
//         user: action.payload,
//       };

//     case actionTypes.LOGOUT:
//       return {
//         ...state,
//         user: null,
//       };

//     case actionTypes.FETCH_USER:
//       return {
//         ...state,
//         loading: true,
//       };

//     default:
//       return state;
//   }
// };

// const UserProviderApi = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const fetchUser = async () => {
//       dispatch({ type: actionTypes.FETCH_USER });

//       try {
//         const user = supabase.auth.user();
//         dispatch({ type: actionTypes.LOGIN, payload: user });
//       } catch (error) {
//         dispatch({ type: actionTypes.LOGOUT });
//       }
//     };

//     fetchUser();
//   }, []);

//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();

//       if (error) {
//         throw error;
//       }

//       dispatch({ type: actionTypes.LOGOUT });
//     } catch (error) {
//       console.error("Error signing out: ", error.message);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ state, signOut }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }

//   return context;
// };

// export { UserProviderApi, useUserContext };

// //import {
// //   createContext,
// //   // useReducer,
// //   useContext,
// //   useState,
// //   useEffect,
// //   useReducer,
// // } from "react";
// // import supabase from "../../../supabase";
// // import { useNavigate } from "react-router-dom";

// // //Create context
// // const Context = createContext();

// // // Initial state
// // const initialState = {
// //   user: null,
// //   isAuthenticated: false,
// //   isLoading: false,
// //   error: "",
// // };

// // //Reducer function
// // const reducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case "loading":
// //       return {
// //         ...state,
// //         isLoading: true,
// //       };

// //     case "user/login":
// //       return { ...state, user: action.payload, isAuthenticated: true };

// //     case "user/logout":
// //       return {
// //         ...state,
// //         user: null,
// //         isAuthenticated: false,
// //       };

// //     case "user/edited":
// //       return {
// //         ...state,
// //         user: null,
// //         isAuthenticated: false,
// //       };

// //     case "user/deleted":
// //       return {
// //         ...state,
// //         user: null,
// //         isAuthenticated: false,
// //       };

// //     case "user/created":
// //       return {
// //         ...state,
// //         isLoading: false,
// //         user: action.payload,
// //       };

// //     case "rejected":
// //       return {
// //         ...state,
// //         isLoading: false,
// //         error: action.payload,
// //       };

// //     default:
// //       throw new Error("Unknown action type");
// //   }
// // };

// // const Provider = ({ children }) => {
// //   //Log in
// //   const login = async (user) => {
// //     try {
// //       await supabase.auth.signInWithPassword({
// //         email: user.email,
// //         password: user.password,
// //       });
// //     } catch (error) {
// //       console.error("Something went wrong login: ", error.message);
// //     }
// //   };

// //   //Log out
// //   const logout = async () => {
// //     try {
// //       await supabase.auth.signOut();
// //     } catch (error) {
// //       console.error("Something went wrong when signing out: ", error.message);
// //     }
// //   };

// //   //Create a member
// //   async function createUser(newUser) {
// //     console.log(newUser);
// //     try {
// //       const { data, error } = await supabase.auth.signUp({
// //         email: newUser.email,
// //         password: newUser.password,
// //         options: {
// //           data: {
// //             first_name: newUser.first_name,
// //             last_name: newUser.last_name,
// //           },
// //         },
// //       });

// //       if (error) throw error;
// //     } catch (error) {
// //       console.error("Something went wrong when creating the user.");
// //     }
// //   }

// //   const exposed = {
// //     login,
// //     logout,
// //     createUser,
// //   };

// //   return <Context.Provider value={exposed}>{children}</Context.Provider>;
// // };

// // export const useUser = () => useContext(Context);

// // export default Provider;

// // // //User context provider component
// // // export const UserProvider = ({ children }) => {
// // //   const [{ user, isAuthenticated }, dispatch] = useReducer(
// // //     reducer,
// // //     initialState
// // //   );

// // //   const login = async (userData) => {
// // //     dispatch({ type: "loading" });

// // //     try {
// // //       const { data: user, userLoginError } =
// // //         await supabase.auth.signInWithPassword({
// // //           email: userData.email,
// // //           password: userData.password,
// // //         });

// // //       if (userLoginError) throw userLoginError;

// // //       dispatch({ type: "user/login", payload: user });

// // //       // fetchCustomersOnAdd();
// // //     } catch {
// // //       dispatch({
// // //         type: "rejected",
// // //         payload: "There an error creating the member",
// // //       });
// // //     }
// // //   };

// // //   const logout = () => {
// // //     dispatch({ type: "logout" });
// // //   };

// // //   const editUser = (updatedUserData) => {
// // //     dispatch({ type: "user/edited", payload: updatedUserData });
// // //   };

// // //   const deleteUser = () => {
// // //     dispatch({ type: "user/deleted" });
// // //   };

// // //   // Create a member
// // //   async function createUser(newUser) {
// // //     dispatch({ type: "loading" });
// // //     // dispatch({ type: "create_customer" });
// // //     console.log(newUser);
// // //     try {
// // //       const { data, error } = await supabase.auth.signUp({
// // //         email: newUser.email,
// // //         password: newUser.password,
// // //         options: {
// // //           data: {
// // //             first_name: newUser.first_name,
// // //             last_name: newUser.last_name,
// // //           },
// // //         },
// // //       });

// // //       if (error) throw error;

// // //       dispatch({ type: "user/created", payload: data });

// // //       // fetchCustomersOnAdd();
// // //     } catch {
// // //       dispatch({
// // //         type: "rejected",
// // //         payload: "There an error creating the member",
// // //       });
// // //     }
// // //   }

// // //   return (
// // //     <UserContext.Provider
// // //       value={{
// // //         user: user?.user,
// // //         isAuthenticated: user?.isAuthenticated,
// // //         login,
// // //         logout,
// // //         editUser,
// // //         deleteUser,
// // //         createUser,
// // //       }}
// // //     >
// // //       {children}
// // //     </UserContext.Provider>
// // //   );
// // // };

// // // export const useUser = () => useContext(UserContext);
