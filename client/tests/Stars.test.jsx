import Stars from "../src/components/Stars";

import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";

describe("Stars component", () => {

	it("renders correct amount of stars for integer rating", () => {
		render(<Stars rating={4} />);
		expect(screen.getAllByTestId("full-star")).toHaveLength(4);
		expect(screen.queryByTestId("half-star")).not.toBeInTheDocument();
		expect(screen.getAllByTestId("empty-star")).toHaveLength(1);
	})

	it("renders correct amount of stars for half rating", () => {
		render(<Stars rating={3.5} />);
		expect(screen.getAllByTestId("full-star")).toHaveLength(3);
		expect(screen.getByTestId("half-star")).toBeInTheDocument();
		expect(screen.getAllByTestId("empty-star")).toHaveLength(1);
	})

	it("renders correct amount of stars for zero rating", () => {
		render(<Stars rating={0} />);
		expect(screen.queryAllByTestId("full-star")).toHaveLength(0);
		expect(screen.queryByTestId("half-star")).not.toBeInTheDocument();
		expect(screen.getAllByTestId("empty-star")).toHaveLength(5);
	})

	it("renders correct amount of stars for decimal rating", () => {
		render(<Stars rating={2.3} />);
		expect(screen.getAllByTestId("full-star")).toHaveLength(2);
		expect(screen.queryByTestId("half-star")).not.toBeInTheDocument();
		expect(screen.getAllByTestId("empty-star")).toHaveLength(3);
	})
})