import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { CreditCard, Truck, User, Phone, MapPin, Mail, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const { cart, user, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = cart.reduce((acc, item) => {
    return acc + (item.price * (item.discountPercentage || 0) / 100) * item.quantity;
  }, 0);
  const deliveryFee = subtotal > 100 ? 0 : 10;
  const total = +(subtotal - discount + deliveryFee).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!mobile || !address || !pincode) {
      setError("Please fill in all shipping details");
      setLoading(false);
      return;
    }

    try {
      await placeOrder({
        name,
        email,
        mobile,
        address,
        pincode,
        paymentMethod
      });
      navigate("/orders", { state: { success: true } });
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#fbf8f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Shipping Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-extrabold font-[integralCF] text-night mb-6 flex items-center gap-2">
              <Truck size={28} className="text-purple-600" /> Shipping Information
            </h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Pincode</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="6 digit PIN"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Shipping Address</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Apartment, Street Name, Landmark, City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50"
                ></textarea>
              </div>

              <div className="pt-2">
                <label className="text-sm font-semibold text-gray-600 block mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === "COD" ? "border-purple-600 bg-purple-50/30 font-bold" : "border-gray-200"
                    }`}
                  >
                    <span>Cash on Delivery (COD)</span>
                    <Truck className={paymentMethod === "COD" ? "text-purple-600" : "text-gray-400"} size={20} />
                  </div>
                  <div
                    onClick={() => setPaymentMethod("CARD")}
                    className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === "CARD" ? "border-purple-600 bg-purple-50/30 font-bold" : "border-gray-200"
                    }`}
                  >
                    <span>Card / UPI (Simulation)</span>
                    <CreditCard className={paymentMethod === "CARD" ? "text-purple-600" : "text-gray-400"} size={20} />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-center font-bold text-lg text-white bg-night hover:bg-gray-800 rounded-2xl cursor-pointer transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? "Processing Order..." : `Pay $${total.toFixed(2)} & Place Order`}
                </button>
              </div>
            </form>
          </div>

          {/* Cart Summary Panel */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-md border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="text-indigo-600" size={24} /> Order Summary
            </h2>
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex py-3 items-center gap-4">
                  <img src={item.images?.[0]} className="w-16 h-16 object-contain bg-gray-50 rounded-xl" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400">Qty: {item.quantity} | Size: {item.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    {item.discountPercentage > 0 && (
                      <p className="text-xs text-red-500">-{item.discountPercentage}% off</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500 font-semibold">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3 text-gray-950">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
