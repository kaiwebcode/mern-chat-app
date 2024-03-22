import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({username, password}) => {
    const success = handleInputErrors(username, password)
    console.log(success)
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password ) {
    if (!username || !password ) {
        toast.error("Please fill in all fields")
        return false
    }

    return true
}   

// const useLogin = () => {
//     // Existing code remains unchanged...
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();
  
//     const login = async (username, password) => {
//       // Trim the input values to remove leading/trailing whitespace
//       const trimmedUsername = username.trim();
//       const trimmedPassword = password.trim();
  
//       // Pass the trimmed values to the error handler
//       const success = handleInputErrors(trimmedUsername, trimmedPassword)
//       if (!success) return;
//       setLoading(true);
//       try {
//         const res = await fetch("/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
//         });
  
//         // The rest of your existing code...
//         const data = await res.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }

//         localStorage.setItem("chat-user", JSON.stringify(data));
//         setAuthUser(data);
//         } catch (error) {
//         toast.error(error.message);
//         } finally {
//         setLoading(false);
//       };
//     };
  
//     return { loading, login };
//   };
  
//   export default useLogin;
  
//   function handleInputErrors(username, password) {
//       // This function doesn't need changes as trimming is handled before calling it
//       if (!username || !password) {
//           toast.error("Please fill in all fields");
//           return false;
//       }
//       return true;
//   }
  