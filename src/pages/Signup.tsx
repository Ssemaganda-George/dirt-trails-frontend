import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

type AuthResponse = {
  access_token: string;
  token_type: string;
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  // Handle login/signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const payload = isLogin
        ? { email, password }
        : { full_name: fullName, email, password };

      const res = await axios.post<AuthResponse>(endpoint, payload);

      login(res.data.access_token, ""); // password not needed here
      navigate("/"); // redirect to homepage
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google/Apple OAuth
  const handleOAuthLogin = async (provider: "google" | "apple") => {
    setError("");
    try {
      const token =
        provider === "google"
          ? "GOOGLE_ID_TOKEN_FROM_FRONTEND"
          : "APPLE_ID_TOKEN_FROM_FRONTEND";

      const res = await axios.post<AuthResponse>(
        `/users/login/${provider}`,
        { token }
      );

      login(res.data.access_token, "");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || `${provider} login failed`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white/90 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition disabled:opacity-50"
        >
          {loading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>
      </form>

      <p
        className="text-center mt-4 text-sm text-gray-600 cursor-pointer hover:underline"
        onClick={toggleMode}
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </p>

      <div className="flex items-center my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("apple")}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <FaApple size={20} /> Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
