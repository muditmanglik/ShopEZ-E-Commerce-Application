import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

import HeroContent from "../src/components/HeroContent";

const renderWithRouter = (ui) => {
	return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe("Hero Section component", () => {
	it("renders all headline texts", () => {
		renderWithRouter(<HeroContent />);

		expect(screen.getByRole("heading", { name: /LOOK GOOD/i })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: /FEEL BETTER/i })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: /SHOP\.EZ NOW/i })).toBeInTheDocument();
	})

	it("renders the description paragraph", () => {
		renderWithRouter(<HeroContent />)
		expect(
			screen.getByText(/Discover curated fashion at Shop.EZ/i)
		).toBeInTheDocument()
	})

	it("renders the Shop Now link inside button", () => {
		renderWithRouter(<HeroContent />)
		const link = screen.getByRole("link", { name: "Shop Now" })
		expect(link).toHaveAttribute("href", "/shop")
	})
})