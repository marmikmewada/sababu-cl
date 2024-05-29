// import { createContext, useContext, useEffect, useState } from "react";
// import supabase from "../../../supabase";

// //
// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// //Provider
// const Provider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [auth, setAuth] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       const { user: currentUser } = data;
//       setUser(currentUser ?? null);
//       setAuth(currentUser ? true : false);
//       getProfile(currentUser?.id);
//       setLoading(false);

//       console.log(data);
//     };
//     getUser();

//     const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === "PASSWORD_RECOVERY") {
//         setAuth(false);
//       } else if (event === "SIGNED_IN") {
//         setUser(session.user);
//         setAuth(true);
//         getProfile(session.user?.id);
//       } else if (event === "SIGNED_OUT") {
//         setUser(null);
//         setAuth(false);
//         setProfile(null);
//       }
//     });

//     return () => {
//       data.subscription.unsubscribe();
//     };
//   }, []);

//   const getProfile = async (id) => {
//     console.log(id);
//     try {
//       if (!id) return console.error("No id");
//       const { data, error } = await supabase
//         .from("customers")
//         .select("*")
//         .eq("id", id)
//         .single();

//       console.log(data);
//       if (error) {
//         throw new Error("Error fetching user -", error.message);
//       }

//       setProfile(data);
//     } catch (e) {
//       console.log("Error fetching profile: ", e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //
//   const register = (newUser) =>
//     supabase.auth.signUp({
//       email: newUser.email,
//       password: newUser.password,
//       options: {
//         data: {
//           first_name: newUser.first_name,
//           last_name: newUser.last_name,
//         },
//       },
//     });

//   const login = (formData) =>
//     supabase.auth.signInWithPassword({
//       email: formData.email,
//       password: formData.password,
//     });

//   const logout = () => supabase.auth.signOut();

//   const passwordReset = (email) => {
//     supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: "http://localhost:5173/app/users/update-password",
//     });
//   };

//   const updatePassword = (formData) => {
//     supabase.auth.updateUser({ password: formData.password });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         auth,
//         user,
//         login,
//         profile,
//         logout,
//         passwordReset,
//         updatePassword,
//         register,
//         getProfile,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default Provider;
