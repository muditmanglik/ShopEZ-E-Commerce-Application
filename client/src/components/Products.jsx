import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ url }) => {
	const [dataObject, setDataObject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getProducts() {
			setLoading(true);
			setError(null);
			try {
				let response;
				if (url === "all" || !url) {
					response = await fetch("http://localhost:5000/api/products");
				} else {
					response = await fetch(url);
				}
				if (!response.ok) throw new Error("Failed to fetch products");
				const data = await response.json();
				setDataObject(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		getProducts();
	}, [url]);

	const heading = url === 'all' ? "All Products" : dataObject?.products?.[0]?.category
		?.replace(/-/g, " ")
		?.replace(/\b\w/g, (l) => l.toUpperCase());


	if (loading) {
		return (
			<div className="pb-20 flex-3/4">
				<h2 className="text-5xl font-[integralCF] pb-12 text-center">{heading}</h2>
				<div className="grid grid-cols-3 gap-4">
					{Array.from({ length: 6 }).map((_, index) => (
						<ProductSkeleton key={index} />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <p className="text-center text-red-500 pt-10">Error: {error}</p>;
	}

	return (
		<div className="pb-20 flex-3/4">
			<h2 className="text-5xl font-[integralCF] pb-12 text-center">
				{dataObject?.products?.length > 0 ? heading : "No products found"}
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
				{dataObject?.products?.map((product) => (
					<ProductCard data={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default Products;
