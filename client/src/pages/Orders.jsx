import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ShoppingBag, CheckCircle, Package, Calendar, Tag, CreditCard } from "lucide-react";

const Orders = () => {
  const { token, user } = useContext(ShopContext);
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const showSuccessBanner = location.state?.success || false;

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("Network error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!token) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen flex items-center justify-center bg-[#fbf8f5] px-4">
          <div className="text-center p-8 max-w-md bg-white rounded-3xl shadow-md border border-gray-100">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-500 mb-6">Please log in to view your order history.</p>
            <Link to="/login" className="bg-night text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
              Go to Login
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#fbf8f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {showSuccessBanner && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-3xl shadow-sm text-center flex flex-col items-center">
              <CheckCircle size={52} className="text-green-500 mb-3" />
              <h2 className="text-2xl font-extrabold text-green-900 font-[integralCF]">Order Placed Successfully!</h2>
              <p className="text-green-700 mt-1">Thank you for your purchase. Your items will arrive shortly.</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold font-[integralCF] text-night">My Orders</h1>
            <span className="text-sm font-semibold text-gray-500">{orders.length} items purchased</span>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : orders.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Link to="/shop" className="bg-night text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-50 gap-2 mb-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 font-mono">Order ID: #{order._id}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar size={14} />
                        <span>{new Date(order.orderDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.Status)}`}>
                        {order.Status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={order.Image} className="w-20 h-20 object-contain bg-gray-50 rounded-2xl" alt="" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{order.Title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{order.Desc}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Tag size={13} /> Size: {order.Size}
                        </span>
                        <span>Qty: {order.Quantity}</span>
                        <span className="flex items-center gap-1">
                          <CreditCard size={13} /> {order.payment?.method || 'COD'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${(order.Price * order.Quantity).toFixed(2)}</p>
                      {order.Discount > 0 && (
                        <p className="text-xs text-red-500">({order.Discount}% off applied)</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
