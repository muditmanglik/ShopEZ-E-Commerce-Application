import { render, screen } from "@testing-library/react";
import FooterList from "../src/components/FooterList";
import { describe, it, expect } from "vitest";

describe("FooterList component", () => {
  it("renders heading and list items", () => {
    const heading = "COMPANY";
    const items = ["About", "Careers", "Contact"];

    render(<FooterList heading={heading} list={items} />);

    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
