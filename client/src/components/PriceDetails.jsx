import { useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function getDeliveryCharge(total) {
	if (total > 100 || total <= 0) {
		return 0;
	}
	return 10;
}

export default function PriceDetails({ cart }) {
	const { user } = useContext(ShopContext);

	const subtotal = useMemo(() => {
		return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}, [cart]);

	const deliveryFee = getDeliveryCharge(subtotal);

	const discount = useMemo(() => {
		return cart.reduce((acc, item) => {
			const itemDiscount = (item.price * (item.discountPercentage || 0) / 100) * item.quantity;
			return acc + itemDiscount;
		}, 0);
	}, [cart]);

	const total = +(subtotal - discount + deliveryFee).toFixed(2);

	return (
		<div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-500">
			<h2 className="text-xl font-bold mb-4">Order Summary</h2>

			<div className="flex justify-between pt-5 gap-5">
				<span className="text-gray-800">Subtotal</span>
				<span className="font-bold">${subtotal.toFixed(2)}</span>
			</div>

			<div className="flex justify-between mb-2 pt-2">
				<span className="text-gray-800">Discount</span>
				<span className="text-red-500 font-bold">-${discount.toFixed(2)}</span>
			</div>

			<div className="flex justify-between mb-4 pt-2 pb-3">
				<span className="text-gray-800">Delivery Fee</span>
				<span className="font-bold">${deliveryFee.toFixed(2)}</span>
			</div>

			<hr className="my-2" />

			<div className="flex justify-between font-semibold text-lg pt-3">
				<span>Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>

			<div className="pt-6">
				<Link
					to={user ? "/checkout" : "/login"}
					className="w-full block text-center bg-night hover:bg-gray-800 text-white font-bold py-3.5 px-4 rounded-xl cursor-pointer shadow-md transition-all text-sm uppercase tracking-wider"
				>
					{user ? "Proceed to Checkout" : "Login to Checkout"}
				</Link>
			</div>
		</div>
	);
}
