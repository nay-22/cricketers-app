import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CricketerCard from "../../../src/components/cards/CricketerCard";
import { TPlayer } from "../../../src/types";
import ThemeProvider from "../../../src/context/provider/ThemeProvider";
import AppProvider from "../../../src/context/provider/AppProvider";
import { lightTheme } from "../../../src/config/themes";
import "@testing-library/jest-dom/vitest";

vi.mock("../hooks/useTheme", () => ({
  default: vi.fn(() => lightTheme),
}));

describe("CricketerCard", () => {
  const mockPlayer: TPlayer = {
    id: "_2",
    name: "Rohit Sharma",
    description:
      "Rohit Gurunath Sharma, is an Indian international cricketer and the current captain of India men’s cricket team in all formats. Considered one of the best batsmen of his generation and one of greatest opening batters of all time, Sharma is known for his timing, elegance, six-hitting abilities and leadership skills.",
    type: "bowler",
    points: 234,
    dob: 546739200000,
  };

  it("should render cricketer card with the main player details", () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <CricketerCard {...mockPlayer} />
        </ThemeProvider>
      </AppProvider>
    );

    expect(screen.getByText("Rohit Sharma")).toBeVisible();
    expect(
      screen.getByText(
        "Rohit Gurunath Sharma, is an Indian international cricketer and the current captain of India men’s cricket team in all formats. Considered one of the best batsmen of his generation and one of greatest opening batters of all time, Sharma is known for his timing, elegance, six-hitting abilities and leadership skills."
      )
    ).toBeVisible();
  });
});
