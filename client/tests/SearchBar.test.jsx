import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import SearchBar from "../src/components/SearchBar";

describe("SearchBar component", () => {
	it("should render the search input and icon", () => {

		render(
			<BrowserRouter>
				<SearchBar />
			</BrowserRouter>
		);

		expect(screen.getByPlaceholderText("Search for products")).toBeInTheDocument();
		expect(screen.getByTestId("search-icon")).toBeInTheDocument();
	});

	it("should call setCategoryURL with query on Enter", async () => {
		const user = userEvent.setup();
		const setCategoryURL = vi.fn();

		render(
			<BrowserRouter>
				<SearchBar setCategoryURL={setCategoryURL} />
			</BrowserRouter>
		);

		const input = screen.getByPlaceholderText("Search for products");
		await user.type(input, "laptop");
		await user.keyboard("{Enter}");

		expect(setCategoryURL).toHaveBeenCalledWith("https://dummyjson.com/products/search?q=laptop");
	});

	it("should call with 'all' as parameter when no input", async () => {
		const user = userEvent.setup();
		const setCategoryURL = vi.fn();

		render(
			<BrowserRouter>
				<SearchBar setCategoryURL={setCategoryURL} />
			</BrowserRouter>
		);

		const input = screen.getByPlaceholderText("Search for products");
		await user.type(input, "  ");
		await user.keyboard("{Enter}");

		expect(setCategoryURL).toHaveBeenCalledWith("all");
	});



});