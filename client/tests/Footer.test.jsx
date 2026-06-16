import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";
import { describe, it, expect } from "vitest";

describe("Footer component", () => {
	it("renders the brand name", () => {
		render(<Footer />);
		expect(screen.getByRole("heading", { name: "SHOP.EZ" })).toBeInTheDocument();
	});

	it("renders the brand description", () => {
		render(<Footer />);
		expect(screen.getByText(/Discover curated fashion/i)).toBeInTheDocument();
	});

	it("renders social icons", () => {
		render(<Footer />);
		const icons = screen.getAllByTestId("lucide-icon");
		expect(icons.length).toBeGreaterThanOrEqual(4);
	});

	it("renders all footer list sections", () => {
		render(<Footer />);
		const sectionHeadings = ["COMPANY", "HELP", "FAQ", "RESOURCES"];
		sectionHeadings.forEach(name => {
			expect(screen.getByRole("heading", { name })).toBeInTheDocument();
		});
	});

	it("renders the copyright", () => {
		render(<Footer />);
		expect(
			screen.getByText(/© 2025, All Rights Reserved/i)
		).toBeInTheDocument();
	});
});
