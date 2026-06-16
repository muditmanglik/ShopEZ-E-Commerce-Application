import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

export default function ProductCard({ data }) {
	const productName = data.title;
	const price = data.price;
	const productImage = data.images[0];

	const { addToCart, user } = useContext(ShopContext);
	const navigate = useNavigate();

	const handleShopNow = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await addToCart(data, "M");
		navigate(user ? "/checkout" : "/login");
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
			<Link to={`/product/${data.id}`}>
				<img
					src={productImage}
					alt={productName}
					className="w-full h-64 object-contain bg-blush rounded-t-2xl"
				/>
			</Link >
			<div className="p-4 flex flex-col justify-between flex-1">
				<h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{productName}</h3>
				<p className="text-gray-600 mt-1">${price}</p>
				<button
					onClick={handleShopNow}
					className="mt-4 bg-night text-white px-4 py-2.5 rounded-xl w-full cursor-pointer font-bold transform transition-transform duration-200 hover:scale-105"
				>
					Shop Now
				</button>
			</div>
		</div>
	);
}
