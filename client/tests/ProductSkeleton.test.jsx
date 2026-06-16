import ProductSkeleton from "../src/components/ProductSkeleton";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("ProductSkeleton", () => {
	it("renders an image placeholder", () => {
		render(<ProductSkeleton />);
		const imageDiv = screen.getByTestId("skeleton-image");
		expect(imageDiv).toBeInTheDocument();
	});

	it("renders three placeholder bars for title, price, and button", () => {
		render(<ProductSkeleton />);
		const bars = screen.getAllByTestId("skeleton-bar");
		expect(bars.length).toBe(3);
	});
});
