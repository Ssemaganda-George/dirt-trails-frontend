import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (emailOrToken: string | { token: string }, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (emailOrToken: string | { token: string }, password?: string) => {
    if (typeof emailOrToken === "string") {
      // Email/password login
      if (!password) throw new Error("Password is required");
      const res = await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrToken, password }),
      });
      const data = await res.json();
      setToken(data.access_token);
    } else {
      // OAuth login
      setToken(emailOrToken.token);
    }
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
