import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ShieldAlert, Package, ShoppingBag, Users, Plus, Trash2, Edit, Check, X } from "lucide-react";

const AdminDashboard = () => {
  const { token, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Product Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [carouselStr, setCarouselStr] = useState("");
  const [category, setCategory] = useState("mens-shirts");
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L", "XL"]);
  const [gender, setGender] = useState("unisex");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [showProductForm, setShowProductForm] = useState(false);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "One Size"];
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (!token || user?.UserType !== "ADMIN") {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch products
        const prodRes = await fetch(`${API_URL}/products`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData.products);
        }

        // Fetch orders
        const ordRes = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (ordRes.ok) {
          const ordData = await ordRes.json();
          setOrders(ordData);
        }

        // Fetch users
        const userRes = await fetch(`${API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUsersList(userData);
        }
      } catch (err) {
        setError("Error fetching administration data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleCreateOrUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      title,
      description,
      mainImg,
      carousel: carouselStr.split(",").map(url => url.trim()).filter(url => url),
      category,
      sizes: selectedSizes,
      gender,
      price: Number(price),
      discount: Number(discount)
    };

    try {
      const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save product");

      if (editingId) {
        setProducts(products.map(p => p._id === editingId ? data : p));
        setSuccess("Product updated successfully!");
      } else {
        setProducts([...products, data]);
        setSuccess("Product created successfully!");
      }

      resetProductForm();
    } catch (err) {
      setError(err.message || "Error saving product");
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setMainImg(product.mainImg);
    setCarouselStr(product.carousel?.join(", ") || "");
    setCategory(product.category);
    setSelectedSizes(product.sizes || []);
    setGender(product.gender);
    setPrice(product.price);
    setDiscount(product.discount);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");

      setProducts(products.filter(p => p._id !== id));
      setSuccess("Product deleted successfully");
    } catch (err) {
      setError(err.message || "Error deleting product");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ Status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update order status");

      setOrders(orders.map(o => o._id === orderId ? { ...o, Status: newStatus } : o));
      setSuccess("Order status updated successfully!");
    } catch (err) {
      setError(err.message || "Error updating status");
    }
  };

  const toggleSizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const resetProductForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setMainImg("");
    setCarouselStr("");
    setCategory("mens-shirts");
    setSelectedSizes(["S", "M", "L", "XL"]);
    setGender("unisex");
    setPrice("");
    setDiscount("0");
    setShowProductForm(false);
  };

  if (!token || user?.UserType !== "ADMIN") {
    return (
      <>
        <NavBar />
        <main className="min-h-screen flex items-center justify-center bg-[#fbf8f5] px-4">
          <div className="text-center p-8 max-w-md bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col items-center">
            <ShieldAlert size={52} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-500 mb-6">Administrator credentials are required to view this dashboard.</p>
            <Link to="/" className="bg-night text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
              Return Home
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
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-4xl font-extrabold font-[integralCF] text-night">Admin Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage products, verify customer orders, and audit users.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab("products"); setShowProductForm(true); setEditingId(null); }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center justify-between">
              <p className="text-sm text-red-700">{error}</p>
              <button onClick={() => setError("")} className="text-red-500"><X size={16} /></button>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl flex items-center justify-between">
              <p className="text-sm text-green-700">{success}</p>
              <button onClick={() => setSuccess("")} className="text-green-500"><Check size={16} /></button>
            </div>
          )}

          {/* Form to Add/Edit Product */}
          {showProductForm && (
            <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md space-y-6 relative">
              <button onClick={resetProductForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <h3 className="text-2xl font-bold text-gray-900">
                {editingId ? `Edit Product: ${title}` : "Add New Product"}
              </h3>
              
              <form onSubmit={handleCreateOrUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Product Title</label>
                    <input
                      type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Vintage Denim Jacket"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Description</label>
                    <textarea
                      required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="Product features, materials, and fits..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Category</label>
                      <select
                        value={category} onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="mens-shirts">Mens Shirts</option>
                        <option value="mens-shoes">Mens Shoes</option>
                        <option value="womens-dresses">Womens Dresses</option>
                        <option value="womens-shoes">Womens Shoes</option>
                        <option value="womens-bags">Womens Bags</option>
                        <option value="tops">Tops</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Gender</label>
                      <select
                        value={gender} onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Price ($)</label>
                      <input
                        type="number" required min="0" value={price} onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price tag"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Discount (%)</label>
                      <input
                        type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Discount percent"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Main Image URL</label>
                    <input
                      type="url" required value={mainImg} onChange={(e) => setMainImg(e.target.value)}
                      placeholder="http://example.com/image.jpg"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Carousel Image URLs (comma-separated)</label>
                    <input
                      type="text" value={carouselStr} onChange={(e) => setCarouselStr(e.target.value)}
                      placeholder="url1.jpg, url2.jpg, url3.jpg"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-2">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size} type="button"
                          onClick={() => toggleSizeSelection(size)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedSizes.includes(size)
                              ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-night hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl cursor-pointer"
                    >
                      {editingId ? "Save Changes" : "Create Product"}
                    </button>
                    <button
                      type="button" onClick={resetProductForm}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 py-4 px-6 font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "products" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Package size={18} /> Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 py-4 px-6 font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "orders" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <ShoppingBag size={18} /> Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 py-4 px-6 font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "users" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users size={18} /> Users ({usersList.length})
            </button>
          </div>

          {/* Tab Contents */}
          {loading ? (
            <p className="text-center text-gray-500 py-12">Loading data...</p>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              
              {/* Tab: Products */}
              {activeTab === "products" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4 pl-6">Product</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Sizes</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Discount</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {products.map(product => (
                        <tr key={product._id} className="hover:bg-gray-50/50">
                          <td className="p-4 pl-6 flex items-center gap-3">
                            <img src={product.mainImg} className="w-12 h-12 object-contain bg-gray-50 rounded-xl" alt="" />
                            <div className="font-bold text-gray-800 max-w-[200px] truncate">{product.title}</div>
                          </td>
                          <td className="p-4 text-gray-500 capitalize">{product.category.replace("-", " ")}</td>
                          <td className="p-4 text-xs text-gray-400 font-semibold max-w-[150px] truncate">{product.sizes?.join(", ")}</td>
                          <td className="p-4 font-bold text-gray-800">${product.price}</td>
                          <td className="p-4 text-red-500 font-semibold">{product.discount}%</td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Orders */}
              {activeTab === "orders" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4 pl-6">Order ID & Item</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Shipping Address</th>
                        <th className="p-4">Total Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {orders.map(order => (
                        <tr key={order._id} className="hover:bg-gray-50/50">
                          <td className="p-4 pl-6 flex items-center gap-3">
                            <img src={order.Image} className="w-12 h-12 object-contain bg-gray-50 rounded-xl" alt="" />
                            <div>
                              <p className="font-bold text-gray-800">{order.Title}</p>
                              <p className="text-2xs text-gray-400 font-mono">#{order._id}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold text-gray-800">{order.name}</p>
                            <p className="text-xs text-gray-400">{order.Email}</p>
                          </td>
                          <td className="p-4 max-w-[180px] truncate">
                            <p className="text-gray-600">{order.Address}</p>
                            <p className="text-xs text-gray-400">PIN: {order.Pincode} | Tel: {order.Mobile}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-gray-800">${(order.Price * order.Quantity).toFixed(2)}</p>
                            <p className="text-xs text-gray-400">Qty: {order.Quantity} | Size: {order.Size}</p>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              order.Status === "Pending" ? "bg-yellow-50 text-yellow-800 border-yellow-100" :
                              order.Status === "Shipped" ? "bg-blue-50 text-blue-800 border-blue-100" :
                              order.Status === "Delivered" ? "bg-green-50 text-green-800 border-green-100" :
                              "bg-red-50 text-red-800 border-red-100"
                            }`}>
                              {order.Status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <select
                              value={order.Status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Users */}
              {activeTab === "users" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4 pl-6">User ID</th>
                        <th className="p-4">Username</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4 pr-6">User Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {usersList.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50/50">
                          <td className="p-4 pl-6 text-xs text-gray-400 font-mono">#{u._id}</td>
                          <td className="p-4 font-bold text-gray-800">{u.username}</td>
                          <td className="p-4 text-gray-600">{u.email}</td>
                          <td className="p-4 pr-6">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              u.UserType === "ADMIN" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"
                            }`}>
                              {u.UserType}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
