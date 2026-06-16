import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import Cart from "../components/Cart";
import ProductDetails from "../components/ProductDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import AdminDashboard from "../pages/AdminDashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <NotFound />,
	},
	{
		path: "shop",
		element: <Shop />,
	},
	{
		path: "product/:productId",
		element: <ProductDetails />,
	},
	{
		path: "cart",
		element: <Cart />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "signup",
		element: <Signup />,
	},
	{
		path: "checkout",
		element: <Checkout />,
	},
	{
		path: "orders",
		element: <Orders />,
	},
	{
		path: "admin",
		element: <AdminDashboard />,
	},
]);

export default router;
