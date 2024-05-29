// // context/AuthContext.js
// import { createContext, useContext, useReducer } from "react";
// import axios from "axios";
// import authReducer from "./authReducer";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:5172";

// const initialState = {
//   users: [],
//   user: {},
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const naviagte = useNavigate();

//   //
//   const createUser = async (formData) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await axios.post(`${BASE_URL}/app/users/register`, formData);
//       dispatch({ type: "SIGNUP_SUCCESS" });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const loginUser = async (formData) => {
//     console.log(formData);
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/app/users/login`, // Update endpoint to /login
//         formData
//       );

//       const token = response.data.token;
//       // Store token in localStorage
//       localStorage.setItem("token", token);
//       dispatch({ type: "LOGIN_SUCCESS" });
//       console.log(token);

//       // naviagte("http://localhost:5173/#/app/customers/profile");
//     } catch (error) {
//       console.log(error.message);
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const logoutUser = () => {
//     // Clear token from localStorage
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT_SUCCESS" });
//   };

//   //
//   const getUsers = async () => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const response = await axios.get(`${BASE_URL}/app/users`);
//       dispatch({ type: "SET_USERS", payload: response.data });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const getUser = async (userId) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const response = await axios.get(`${BASE_URL}/app/users/${userId}`);
//       dispatch({ type: "SET_USERS", payload: response.data });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const updateUser = async (userId, formData) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const response = await axios.put(`/app/users/${userId}`, formData);
//       const updatedUser = response.data; // Assuming the response contains the updated user data
//       dispatch({ type: "UPDATE_USER_SUCCESS", payload: updatedUser });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const deleteUser = async (userId) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await axios.delete(`/app/users/${userId}`);
//       dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   //
//   const clearError = () => {
//     dispatch({ type: "CLEAR_ERROR" });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         createUser,
//         loginUser,
//         logoutUser,
//         getUsers,
//         getUser,
//         updateUser,
//         deleteUser,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// // export const useUser = () => {
// //   return useContext(AuthContext);
// // };

// //
// //

// // import axios from "axios";
// // import Loading from "../Loading";

// // const BASE_URL = "http://localhost:5172";

// // console.log(BASE_URL);

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(authReducer, initialState);

// //   //
// //   const signUp = async (formData, navigate) => {
// //     dispatch({ type: "loading", payload: true });

// //     try {
// //       const response = await axios.post(
// //         `${BASE_URL}/api/users/signup`,
// //         formData
// //       );

// //       console.log(response);

// //       dispatch({ type: actionTypes.SIGN_UP_SUCCESS, payload: response.data });
// //       return response.data;
// //     } catch (error) {
// //       dispatch({ type: actionTypes.SIGN_UP_ERROR, payload: error.message });
// //       throw error;
// //     }
// //   };

// //   //
// //   const signIn = async (formData, navigate) => {
// //     dispatch({ type: actionTypes.SIGN_IN_START });

// //     try {
// //       const response = await axios.post(
// //         `${BASE_URL}/api/users/login`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "application/json", // Ensure Content-Type header is set to application/json
// //           },
// //         }
// //       );

// //       dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: response.data });
// //       console.log(response.data);

// //       return response.data;
// //     } catch (error) {
// //       dispatch({ type: actionTypes.SIGN_IN_ERROR, payload: error.message });
// //       throw error;
// //     }
// //   };

// //   //
// //   const signOut = async () => {
// //     dispatch({ type: actionTypes.SIGN_OUT_START });

// //     try {
// //       // Perform sign-out operation, e.g., clearing local storage, etc.
// //       // Example: Clear local storage
// //       localStorage.removeItem("accessToken");
// //       dispatch({ type: actionTypes.SIGN_OUT_SUCCESS });
// //     } catch (error) {
// //       dispatch({ type: actionTypes.SIGN_OUT_ERROR, payload: error.message });
// //       throw error;
// //     }
// //   };

// //   //
// //   const deleteUser = async () => {
// //     dispatch({ type: actionTypes.DELETE_USER_START });

// //     try {
// //       // Perform delete user operation, e.g., sending request to server to delete user data, etc.
// //       const response = await axios.delete(`${BASE_URL}`);
// //       dispatch({
// //         type: actionTypes.DELETE_USER_SUCCESS,
// //         payload: response.data,
// //       });
// //       return response.data;
// //     } catch (error) {
// //       dispatch({ type: actionTypes.DELETE_USER_ERROR, payload: error.message });
// //       throw error;
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{ signUp, signIn, signOut, deleteUser, state }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
