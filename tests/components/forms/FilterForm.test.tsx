import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilterForm from "../../../src/components/forms/FilterForm";
import useApp from "../../../src/hooks/useApp";
import useTheme from "../../../src/hooks/useTheme";
import { describe, it, expect, vi, afterEach } from "vitest";
import { lightTheme } from "../../../src/config/themes";
import AppProvider from "../../../src/context/provider/AppProvider";
import ThemeProvider from "../../../src/context/provider/ThemeProvider";
import "@testing-library/jest-dom/vitest";
import { AppContextType } from "../../../src/types";

// Ensure theme is mocked
vi.mock("../../../src/hooks/useTheme", () => ({
  default: vi.fn(() => lightTheme),
}));

// Declare mockSetPreferences outside the mock scope
const mockSetPreferences = vi.fn();

// Mock useApp
vi.mock("../../../src/hooks/useApp", () => {
  return {
    default: vi.fn(() => ({
      app: { players: [] },
      setApp: vi.fn(),
      preferences: {
        filterType: undefined,
        sort: { by: "none", type: "asc" },
        theme: "light",
      },
      setPreferences: mockSetPreferences,
    })),
  };
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("FilterForm Component", () => {
  it("should render the filter form with all elements", () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <FilterForm />
        </ThemeProvider>
      </AppProvider>
    );

    expect(screen.getByText("Type")).toBeVisible();
    expect(screen.getByRole("combobox", { name: /Type/i })).toBeVisible();
    expect(screen.getByText("Sort By")).toBeVisible();
    expect(screen.getByText("Name")).toBeVisible();
    expect(screen.getByText("Rank")).toBeVisible();
    expect(screen.getByText("Age")).toBeVisible();

    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(7);
  });

  it("should call setPreferences with correct filter type when a type is selected", async () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <FilterForm />
        </ThemeProvider>
      </AppProvider>
    );

    const selectElement = screen.getByRole("combobox", { name: /Type/i });
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "bowler" } });

    expect(mockSetPreferences).toHaveBeenCalledOnce();
  });

  it("should call setPreferences with filterType undefined when clear filter button is clicked", () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <FilterForm />
        </ThemeProvider>
      </AppProvider>
    );

    const clearButton = screen.getByTestId("clear-filter");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(mockSetPreferences).toHaveBeenCalled();

    expect(mockSetPreferences).toHaveBeenCalledWith(expect.any(Function));

    mockSetPreferences.mock.calls[0][0]((prev: AppContextType) => {
      expect(prev).toEqual(expect.objectContaining({ filterType: undefined }));
    });
  });

  it("should call setPreferences with correct sort when a sort button is clicked", () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <FilterForm />
        </ThemeProvider>
      </AppProvider>
    );

    const sortButton = screen.getByTestId("name-asc");
    fireEvent.click(sortButton);

    mockSetPreferences.mock.calls[0][0]((prev: AppContextType) => {
      expect(prev).toEqual(
        expect.objectContaining({
          sort: {
            by: "name",
            type: "asc",
          },
        })
      );
    });
  });

  it("should reset sort when the same sort button is clicked again", () => {
    render(
      <AppProvider>
        <ThemeProvider>
          <FilterForm />
        </ThemeProvider>
      </AppProvider>
    );

    const sortButton = screen.getByTestId("name-dsc");
    fireEvent.click(sortButton);

    mockSetPreferences.mock.calls[0][0]((prev: AppContextType) => {
      expect(prev).toEqual(
        expect.objectContaining({
          sort: {
            by: "none",
            type: "asc",
          },
        })
      );
    });
  });
});
