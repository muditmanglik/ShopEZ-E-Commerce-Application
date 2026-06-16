import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import PromoBanner from "../components/PromoBanner";
import ShopContainer from "../components/ShopContainer";

import { useState } from "react";

const Shop = () => {
	const [categoryURL, setCategoryURL] = useState("all");
	return (
		<>
			<PromoBanner />
			<NavBar setCategoryURL={setCategoryURL} />
			<ShopContainer categoryURL={categoryURL} setCategoryURL={setCategoryURL} />
			<Footer />
		</>
	)
}

export default Shop;