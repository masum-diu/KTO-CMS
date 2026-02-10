// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("token");
    if (token) {
      // You might want to verify the token with your backend here
      setUser({ token });
      if (router.pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser({ token, ...userData });
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
