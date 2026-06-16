export default function QuantityBtn({ item, addToCart, decreaseQuantity }) {
	return (
		<div className="absolute bottom-2 right-2 md:w-24 flex items-center justify-between gap-2 bg-blush px-3 py-1 rounded-2xl font-medium shadow-sm">
			<button
				className="text-2xl hover:text-night cursor-pointer hover:scale-110 transition-transform"
				onClick={() => decreaseQuantity(item.id)}
			>
				-
			</button>
			<span className="text-xl">{item.quantity}</span>
			<button
				className="text-2xl hover:text-night cursor-pointer hover:scale-110 transition-transform"
				onClick={() => addToCart(item)}
			>
				+
			</button>
		</div>
	);
}
