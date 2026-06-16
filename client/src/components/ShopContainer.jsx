import Filters from "./Filters";
import Products from "./Products";

const ShopContainer = ({ categoryURL, setCategoryURL }) => {

	return (
		<main className="flex flex-col md:flex-row md:px-60 md:py-30 gap-5 items-center md:items-start">
			<Filters setCategoryURL={setCategoryURL} />
			<Products url={categoryURL} />
		</main>
	)

}

export default ShopContainer;