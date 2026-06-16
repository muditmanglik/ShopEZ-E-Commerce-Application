import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { User, Lock, Mail, ArrowRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Signup = () => {
  const { signup } = useContext(ShopContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    try {
      await signup(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to create account");
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
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Join ShopEZ and start shopping effortlessly
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
                <label className="text-sm font-semibold text-gray-600 block mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="john_doe"
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50/50"
                  />
                </div>
              </div>

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
                    placeholder="john@example.com"
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

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Creating account..." : "Sign Up"}
                <span className="absolute right-3 inset-y-0 flex items-center pl-3">
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </span>
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 underline transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
