import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Header from "../../src/components/Header";
import { describe, it, expect, vi, afterEach } from "vitest";
import { lightTheme } from "../../src/config/themes";
import AppProvider from "../../src/context/provider/AppProvider";
import ThemeProvider from "../../src/context/provider/ThemeProvider";

import "@testing-library/jest-dom/vitest";
import { AppContextType } from "../../src/types/index.ts";
import useApp from "../../src/hooks/useApp.ts";

const mockSetPreferences = vi.fn();
vi.mock("../../src/hooks/useApp", () => {
  return {
    default: vi.fn(
      (): AppContextType => ({
        app: { players: [] },
        setApp: vi.fn(),
        preferences: {
          theme: "light",
          filterType: undefined,
          sort: {
            by: "none",
            type: "asc",
          },
        },
        setPreferences: mockSetPreferences,
      })
    ),
  };
});

afterEach(() => {
  cleanup();
});

describe("Header Component", () => {
  it("should render the header with CricketZ logo", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("CricketZ")).toBeVisible();
  });

  it("should render the back button when not on the home page", async () => {
    render(
      <MemoryRouter initialEntries={["/cricketer/_5"]}>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </MemoryRouter>
    );

    const backButton = screen.getByTestId("Back/Home");
    expect(backButton).toBeInTheDocument();
  });

  it("should not render the back button on the home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </MemoryRouter>
    );
    const backButton = screen.queryByTestId("Back/Home");
    expect(backButton).toBeNull();
  });

  it("should render the SearchForm component", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId("search-form")).toBeVisible();
  });

  it("should render the Switch component", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole("switch")).toBeVisible();
  });

  it("should toggle the theme when the Switch is clicked", async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole("switch");
    fireEvent.click(toggleButton);
    expect(mockSetPreferences).toHaveBeenCalled();
  });

  it("should not render the SearchResultView component when Header loads", () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.queryByTestId("result-view")).toBeNull();
  });
});
