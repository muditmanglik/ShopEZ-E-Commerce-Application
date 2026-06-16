import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import { ShopContext } from "../src/context/ShopContext";

const renderWithContext = (ui, { cart = [], setCategoryURL = () => { } } = {}) => {
	return render(
		<ShopContext.Provider value={{ cart, setCategoryURL }}>
			<BrowserRouter>{ui}</BrowserRouter>
		</ShopContext.Provider>
	);
};

describe("NavBar component", () => {
	it("should render navigation links", () => {
		renderWithContext(<NavBar />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
		expect(screen.getByText(/new arrivals/i)).toBeInTheDocument();
		expect(screen.getByText("Brands")).toBeInTheDocument();
		expect(screen.getByText("SHOP.EZ")).toBeInTheDocument();
	});

	it("should display number of items in cart", () => {
		renderWithContext(<NavBar />, { cart: [1, 2, 3] });

		const cartItems = screen.getByText("3");
		expect(cartItems).toBeInTheDocument();
	});

	it("should have a search input", () => {
		renderWithContext(<NavBar />);

		const searchInput = screen.getByPlaceholderText("Search for products");
		expect(searchInput).toBeInTheDocument();
	});
});
