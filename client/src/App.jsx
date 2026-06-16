import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useState, useEffect } from "react";
import { ShopContext } from "./context/ShopContext";

const API_URL = "http://localhost:5000/api";

const App = () => {
	const [token, setToken] = useState(() => localStorage.getItem("shopez_token"));
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("shopez_user");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [cart, setCart] = useState([]);

	// Fetch current user details if token exists
	useEffect(() => {
		const fetchUser = async () => {
			if (!token) return;
			try {
				const res = await fetch(`${API_URL}/auth/me`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				if (res.ok) {
					const userData = await res.json();
					setUser(userData);
					localStorage.setItem("shopez_user", JSON.stringify(userData));
				} else {
					logout();
				}
			} catch (err) {
				console.error("Failed to fetch user profile:", err);
			}
		};
		fetchUser();
	}, [token]);

	const normalizeCart = (data) => {
		return data.map(item => ({
			id: item._id,
			title: item.title,
			description: item.description,
			images: [item.mainImg],
			price: item.Price,
			discountPercentage: item.Discount,
			quantity: item.Quantity,
			size: item.size
		}));
	};

	// Fetch cart from database when logged in, or load from localStorage when guest
	useEffect(() => {
		const fetchCart = async () => {
			if (user && token) {
				try {
					const res = await fetch(`${API_URL}/cart`, {
						headers: { Authorization: `Bearer ${token}` }
					});
					if (res.ok) {
						const data = await res.json();
						setCart(normalizeCart(data));
					}
				} catch (err) {
					console.error("Failed to fetch cart:", err);
				}
			} else {
				const storedCart = localStorage.getItem("shopez_guest_cart");
				setCart(storedCart ? JSON.parse(storedCart) : []);
			}
		};
		fetchCart();
	}, [user, token]);

	// Update localStorage for guests
	useEffect(() => {
		if (!user) {
			localStorage.setItem("shopez_guest_cart", JSON.stringify(cart));
		}
	}, [cart, user]);

	// Auth Actions
	const login = async (email, password) => {
		const res = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to log in");
		
		setToken(data.token);
		setUser({ _id: data._id, username: data.username, email: data.email, UserType: data.UserType });
		localStorage.setItem("shopez_token", data.token);
		localStorage.setItem("shopez_user", JSON.stringify({ _id: data._id, username: data.username, email: data.email, UserType: data.UserType }));

		// Sync guest cart to db upon login
		const guestCart = localStorage.getItem("shopez_guest_cart");
		if (guestCart) {
			const items = JSON.parse(guestCart);
			for (const item of items) {
				try {
					await fetch(`${API_URL}/cart`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${data.token}`
						},
						body: JSON.stringify({
							title: item.title,
							description: item.description,
							mainImg: item.mainImg || item.images?.[0],
							size: item.size || "M",
							Price: item.price || item.Price,
							Discount: item.discount || item.Discount || 0,
							Quantity: item.Quantity || item.quantity || 1
						})
					});
				} catch (err) {
					console.error("Error syncing cart item:", err);
				}
			}
			localStorage.removeItem("shopez_guest_cart");
		}
	};

	const signup = async (username, email, password) => {
		const res = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, email, password })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to register");

		setToken(data.token);
		setUser({ _id: data._id, username: data.username, email: data.email, UserType: data.UserType });
		localStorage.setItem("shopez_token", data.token);
		localStorage.setItem("shopez_user", JSON.stringify({ _id: data._id, username: data.username, email: data.email, UserType: data.UserType }));
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		setCart([]);
		localStorage.removeItem("shopez_token");
		localStorage.removeItem("shopez_user");
		localStorage.removeItem("shopez_guest_cart");
	};

	// Cart Actions
	const syncDBCart = async () => {
		if (user && token) {
			const res = await fetch(`${API_URL}/cart`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.ok) {
				const data = await res.json();
				setCart(normalizeCart(data));
			}
		}
	};

	const addToCart = async (product, size = "M") => {
		const price = product.price || product.Price;
		const discount = product.discount || product.Discount || product.discountPercentage || 0;
		const mainImg = product.mainImg || product.images?.[0];

		if (user && token) {
			try {
				const res = await fetch(`${API_URL}/cart`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						title: product.title,
						description: product.description,
						mainImg,
						size,
						Price: price,
						Discount: discount,
						Quantity: 1
					})
				});
				if (res.ok) {
					await syncDBCart();
				}
			} catch (err) {
				console.error("Failed to add to cart in DB:", err);
			}
		} else {
			// Guest local cart
			setCart((prevCart) => {
				const existing = prevCart.find(item => item.title === product.title && item.size === size);
				if (existing) {
					return prevCart.map(item =>
						item.title === product.title && item.size === size
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
				}
				return [...prevCart, {
					id: 'guest_' + Date.now() + Math.random().toString(36).substr(2, 9),
					title: product.title,
					description: product.description,
					images: [mainImg],
					size,
					price: price,
					discountPercentage: discount,
					quantity: 1
				}];
			});
		}
	};

	const removeFromCart = async (id) => {
		if (user && token) {
			try {
				const res = await fetch(`${API_URL}/cart/${id}`, {
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` }
				});
				if (res.ok) {
					await syncDBCart();
				}
			} catch (err) {
				console.error("Failed to delete from cart in DB:", err);
			}
		} else {
			setCart((prev) => prev.filter(item => item.id !== id));
		}
	};

	const decreaseQuantity = async (id) => {
		const item = cart.find(item => item.id === id);
		if (!item) return;

		const newQty = item.quantity - 1;

		if (user && token) {
			try {
				const res = await fetch(`${API_URL}/cart/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ Quantity: newQty })
				});
				if (res.ok) {
					await syncDBCart();
				}
			} catch (err) {
				console.error("Failed to update cart quantity in DB:", err);
			}
		} else {
			if (newQty <= 0) {
				setCart((prev) => prev.filter(item => item.id !== id));
			} else {
				setCart((prevCart) =>
					prevCart.map(item =>
						item.id === id ? { ...item, quantity: newQty } : item
					)
				);
			}
		}
	};

	const clearCart = async () => {
		if (user && token) {
			try {
				await fetch(`${API_URL}/cart`, {
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` }
				});
				setCart([]);
			} catch (err) {
				console.error("Failed to clear cart in DB:", err);
			}
		} else {
			setCart([]);
		}
	};

	const placeOrder = async (shippingDetails) => {
		if (!user || !token) throw new Error("Please log in to place an order");

		// Map UI cart items back to format expected by backend order creation
		const orderItems = cart.map(item => ({
			title: item.title,
			description: item.description,
			mainImg: item.images[0],
			size: item.size,
			Quantity: item.quantity,
			Price: item.price,
			Discount: item.discountPercentage
		}));

		const res = await fetch(`${API_URL}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: shippingDetails.name,
				Mobile: shippingDetails.mobile,
				Email: shippingDetails.email,
				Address: shippingDetails.address,
				Pincode: shippingDetails.pincode,
				paymentMethod: shippingDetails.paymentMethod,
				items: orderItems
			})
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to place order");

		// Clear cart upon successful order
		await clearCart();
		return data;
	};

	return (
		<ShopContext.Provider value={{
			user,
			token,
			login,
			logout,
			signup,
			cart,
			addToCart,
			removeFromCart,
			decreaseQuantity,
			clearCart,
			placeOrder
		}}>
			<RouterProvider router={router} />
		</ShopContext.Provider>
	);
}

export default App;
