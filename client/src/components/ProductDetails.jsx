import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

import PromoBanner from "./PromoBanner";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Stars from "./Stars";

const ProductDetails = () => {
	const { productId } = useParams();
	const navigate = useNavigate();
	const { cart, addToCart, user } = useContext(ShopContext);

	const [dataObject, setDataObject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedSize, setSelectedSize] = useState("M");

	useEffect(() => {
		async function getProduct() {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`http://localhost:5000/api/products/${productId}`);
				if (!response.ok) throw new Error("Failed to fetch product details");
				const data = await response.json();
				setDataObject(data);
				if (data.sizes && data.sizes.length > 0) {
					setSelectedSize(data.sizes[0]);
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		getProduct();
	}, [productId]);

	const handleShopNow = async () => {
		await addToCart(dataObject, selectedSize);
		navigate(user ? "/checkout" : "/login");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-gray-500 font-medium">Loading details...</p>
			</div>
		);
	}

	if (error) {
		return <p className="text-center text-red-500 pt-10">Error: {error}</p>;
	}

	return (
		<>
			<PromoBanner />
			<NavBar cart={cart} />
			<main className="flex justify-center bg-[#fbf8f5] py-10 min-h-screen">
				<div className="w-[90%] md:w-[80%] max-w-6xl bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
					<div className="flex flex-col lg:flex-row gap-12">
						{/* Main image */}
						<div className="flex-1 max-w-md mx-auto lg:mx-0 bg-[#fbf8f5] rounded-3xl p-6 border border-gray-100 flex items-center justify-center">
							<img
								src={dataObject.images?.[0] || dataObject.mainImg}
								alt={dataObject.title}
								className="max-h-96 object-contain rounded-2xl"
							/>
						</div>

						{/* Details Panel */}
						<div className="flex-1 flex flex-col justify-between">
							<div className="space-y-4">
								<h1 className="text-4xl font-extrabold font-[integralCF] text-gray-900 leading-tight">
									{dataObject.title}
								</h1>
								<div className="flex items-center gap-2">
									<Stars rating={dataObject.rating || 5} />
									<span className="text-sm text-gray-400">({dataObject.reviews?.length || 0} reviews)</span>
								</div>
								<p className="text-3xl font-extrabold text-night">${dataObject.price}</p>
								<p className="text-gray-600 text-base leading-relaxed py-2">
									{dataObject.description}
								</p>

								{/* Sizes Selector */}
								{dataObject.sizes && dataObject.sizes.length > 0 && (
									<div className="space-y-2 pt-2">
										<span className="text-sm font-bold text-gray-500 uppercase tracking-wider block">
											Select Size
										</span>
										<div className="flex flex-wrap gap-2.5">
											{dataObject.sizes.map((sz) => (
												<button
													key={sz}
													onClick={() => setSelectedSize(sz)}
													className={`h-11 min-w-[44px] px-3 text-sm font-bold rounded-xl border transition-all ${
														selectedSize === sz
															? "bg-night border-night text-white shadow-sm"
															: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
													}`}
												>
													{sz}
												</button>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 pt-8">
								<button
									onClick={handleShopNow}
									className="flex-1 bg-night hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-2xl cursor-pointer transition-all shadow-md text-center"
								>
									Shop Now
								</button>
								<button
									onClick={() => addToCart(dataObject, selectedSize)}
									className="flex-1 border-2 border-night text-night font-bold py-4 px-6 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all text-center"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>

					{/* Customer Reviews Section */}
					<div className="mt-16 border-t border-gray-100 pt-10">
						<h3 className="text-3xl font-extrabold font-[integralCF] text-night mb-8 text-center sm:text-left">
							Customer Reviews
						</h3>
						{dataObject.reviews && dataObject.reviews.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{dataObject.reviews.map((rev, index) => (
									<div
										key={index}
										className="bg-[#fbf8f5] p-6 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow"
									>
										<div className="flex items-center justify-between gap-4 mb-2">
											<span className="font-bold text-gray-800 truncate">{rev.reviewerName}</span>
											<span className="text-xs text-gray-400 whitespace-nowrap">
												{new Date(rev.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
											</span>
										</div>
										<div className="flex gap-0.5 text-yellow-400 text-sm mb-3">
											{Array.from({ length: 5 }).map((_, i) => (
												<span key={i} className="text-lg">
													{i < rev.rating ? "★" : "☆"}
												</span>
											))}
										</div>
										<p className="text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 text-center py-6">No customer reviews yet for this product.</p>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default ProductDetails;