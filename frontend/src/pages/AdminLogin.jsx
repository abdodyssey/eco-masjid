import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow max-w-sm w-full"
      >
        <h1 className="text-xl font-bold mb-4 text-emerald-700 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Contoh: admin"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border px-3 py-2 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
