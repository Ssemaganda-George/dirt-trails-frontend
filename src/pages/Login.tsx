import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from "../api/axios";

interface OAuthLoginResponse {
  access_token: string;
  token_type: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const googleIdToken = "GOOGLE_ID_TOKEN_FROM_FRONTEND";
      const res = await axios.post<OAuthLoginResponse>("/users/login/google", {
        token: googleIdToken,
      });
      await login({ token: res.data.access_token });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Google login failed");
    }
  };

  const handleAppleLogin = async () => {
    setError("");
    try {
      const appleIdToken = "APPLE_ID_TOKEN_FROM_FRONTEND";
      const res = await axios.post<OAuthLoginResponse>("/users/login/apple", {
        token: appleIdToken,
      });
      await login({ token: res.data.access_token });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Apple login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white/90 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Login</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <FaApple size={20} /> Continue with Apple
        </button>
      </div>

      <p className="text-center mt-6 text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-green-600 font-semibold hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
