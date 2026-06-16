import { useContext } from "react";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import { ShoppingCart, Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = ({ setCategoryURL }) => {
	const { cart, user, logout } = useContext(ShopContext);
	const noOfProducts = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<nav className="bg-white py-5 flex flex-col md:flex-row p-3 gap-4 justify-around items-center border-gray-200 border-b-3">
			<Link to="/" className="text-3xl font-extrabold font-[integralCF] text-night hover:opacity-90">ShopEZ</Link>
			
			<div className="flex gap-4 items-center">
				<NavLink name="Home" />
				<NavLink name="Shop" />
				{user && (
					<Link to="/orders" className="p-3 font-medium text-[17px] hover:text-blue-500 transition">
						Orders
					</Link>
				)}
				{user && user.UserType === "ADMIN" && (
					<Link to="/admin" className="p-3 font-semibold text-[17px] text-purple-600 hover:text-purple-800 transition flex items-center gap-1">
						<Shield size={16} /> Admin
					</Link>
				)}
			</div>

			<div className="flex items-center gap-5">
				<SearchBar setCategoryURL={setCategoryURL} />
				
				<Link to="/cart" aria-label="Go to cart" className="relative">
					<ShoppingCart className="cursor-pointer w-6 h-6 hover:scale-120 transition-transform duration-500 ease-out delay-25" />
					{noOfProducts > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
							{noOfProducts}
						</span>
					)}
				</Link>

				{user ? (
					<div className="flex items-center gap-3 border-l pl-4 border-gray-200">
						<span className="text-sm font-bold text-gray-700 max-w-[120px] truncate">
							Hi, {user.username}
						</span>
						<button
							onClick={logout}
							aria-label="Logout"
							className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
						>
							<LogOut size={18} />
						</button>
					</div>
				) : (
					<Link
						to="/login"
						className="bg-night text-white text-sm font-bold py-2 px-5 rounded-xl hover:bg-gray-800 transition-colors"
					>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
};

export default NavBar;