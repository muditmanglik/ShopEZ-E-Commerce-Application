import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Lock, Mail, ArrowRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Login = () => {
  const { login } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center bg-[#fbf8f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-3xl shadow-xl border border-blush relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
          
          <div className="text-center">
            <h2 className="mt-2 text-4xl font-extrabold font-[integralCF] text-night tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please sign in to your ShopEZ account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@shopez.com"
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-night hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-night transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                {loading ? "Signing in..." : "Sign In"}
                <span className="absolute right-3 inset-y-0 flex items-center pl-3">
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </span>
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-500 underline transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-700">Test Credentials:</p>
            <p>🛍️ Customer: <code className="bg-gray-200 px-1 rounded text-black font-mono">customer@shopez.com</code> / <code className="bg-gray-200 px-1 rounded text-black font-mono">password123</code></p>
            <p>🛡️ Admin: <code className="bg-gray-200 px-1 rounded text-black font-mono">admin@shopez.com</code> / <code className="bg-gray-200 px-1 rounded text-black font-mono">adminpassword</code></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
