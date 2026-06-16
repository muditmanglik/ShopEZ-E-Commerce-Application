import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import PromoBanner from "../src/components/PromoBanner";

describe("PromoBanner component", () => {
	render(<PromoBanner />);

	it("renders the promo banner", () => {
		expect(
			screen.getByText(/sign up and get 20% off/i)
		).toBeInTheDocument();
	})
})