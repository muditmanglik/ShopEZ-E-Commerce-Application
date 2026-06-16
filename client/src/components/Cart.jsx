import NavBar from "./NavBar";
import Footer from "./Footer"
import PriceDetails from "./PriceDetails";
import CartItem from "./CartItem";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const Cart = () => {
	const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(ShopContext);
	return (
		<>
			<NavBar cart={cart} />
			<main className="flex flex-col lg:flex-row px-5 md:px-20 py-15 gap-20">
				<div className="flex-3/4">
					<h1 className="font-[integralCF] text-4xl">Your Cart</h1>
					<div className="pt-5">
						<div className="bg-white p-6 rounded-xl border-blush border-2 flex flex-col">
							{cart.length === 0 ? (
								<p className="text-gray-500">Your cart is empty.</p>
							) : (
								cart.map(item => (
									<CartItem key={item.id} item={item} removeFromCart={removeFromCart} addToCart={addToCart} decreaseQuantity={decreaseQuantity} />
								))
							)}
						</div>
					</div>
				</div>
				<div className="flex-1/4 md:pt-[60px]">
					<PriceDetails cart={cart} />
				</div>
			</main>
			<Footer />
		</>
	);
}

export default Cart;