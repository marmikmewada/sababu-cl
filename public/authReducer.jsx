const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return { ...state, loading: false };
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, loading: false };
    case "LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false, loading: false };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_LOADING":
      return { ...state, loading: true };
    // New cases for update and delete
    case "UPDATE_USER_SUCCESS":
      return { ...state, loading: false };
    case "DELETE_USER_SUCCESS":
      return { ...state, loading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default userReducer;

// // reducers/authReducer.js

// export const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// export const actionTypes = {
//   SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
//   SIGN_UP_ERROR: "SIGN_UP_ERROR",
//   SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
//   SIGN_IN_ERROR: "SIGN_IN_ERROR",
//   SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
//   SIGN_OUT_ERROR: "SIGN_OUT_ERROR",
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.SIGN_UP_START:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case actionTypes.SIGN_UP_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         error: null,
//       };
//     case actionTypes.SIGN_UP_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case actionTypes.SIGN_IN_START:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case actionTypes.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         error: null,
//       };
//     case actionTypes.SIGN_IN_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case actionTypes.SIGN_OUT_START:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case actionTypes.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         error: null,
//       };
//     case actionTypes.SIGN_OUT_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;
