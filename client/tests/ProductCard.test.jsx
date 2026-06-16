import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ShopContext } from "../src/context/ShopContext";
import ProductCard from "../src/components/ProductCard";

const renderWithProviders = (ui, { cart = [], addToCart = () => { } } = {}) => {
	return render(
		<ShopContext.Provider value={{ cart, addToCart }}>
			<BrowserRouter>{ui}</BrowserRouter>
		</ShopContext.Provider>
	);
};

describe("ProductCard", () => {
	const productData = {
		id: 1,
		title: "Test Product",
		price: 29.99,
		images: ["https://via.placeholder.com/150"],
	};

	it("renders product card", () => {
		renderWithProviders(<ProductCard data={productData} />);
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});

	it("displays product name and price", () => {
		renderWithProviders(<ProductCard data={productData} />);
		expect(screen.getByText("Test Product")).toBeInTheDocument();
		expect(screen.getByText("$29.99")).toBeInTheDocument();
	});

	it("renders product image", () => {
		renderWithProviders(<ProductCard data={productData} />);
		const productImage = screen.getByAltText("Test Product");
		expect(productImage).toHaveAttribute("src", "https://via.placeholder.com/150");
	});

	it("renders 'Add to Cart' button", () => {
		renderWithProviders(<ProductCard data={productData} />);
		expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
	});

	it("calls addToCart when button is clicked", async () => {
		const user = userEvent.setup();
		const addToCartMock = vi.fn();

		renderWithProviders(<ProductCard data={productData} />, { addToCart: addToCartMock });

		const button = screen.getByRole("button", { name: /Add to Cart/i });
		await user.click(button);

		expect(addToCartMock).toHaveBeenCalledWith(productData);
	});

	it("navigates to product detail page on image click", () => {
		renderWithProviders(<ProductCard data={productData} />);
		const productImage = screen.getByAltText("Test Product");
		expect(productImage.closest("a")).toHaveAttribute("href", "/product/1");
	});
});
