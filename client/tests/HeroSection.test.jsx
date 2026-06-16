import HeroSection from "../src/components/HeroSection";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Hero Section component", () => {
	it("renders hero image div", () => {
		render(
			<BrowserRouter>
				<HeroSection />
			</BrowserRouter>
		);
		const heroDiv = screen.getByTestId("hero-img");
		expect(heroDiv).toBeInTheDocument();
	})
})