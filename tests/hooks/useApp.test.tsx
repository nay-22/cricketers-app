import React from "react";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useApp from "../../src/hooks/useApp";
import AppContext from "../../src/context/AppContext";
import { AppContextType } from "../../src/types";
import { ReactNode } from "react";

const mockContextValue: AppContextType = {
  app: { players: [] },
  setApp: vi.fn(),
  preferences: {
    filterType: null,
    sort: { by: "none", type: "asc" },
    theme: "light",
  },
  setPreferences: vi.fn(),
};

const AppProvider = ({ children }: { children: ReactNode }) => (
  <AppContext.Provider value={mockContextValue}>{children}</AppContext.Provider>
);

describe("useApp Hook", () => {
  it("should return the app context when used inside a provider", () => {
    const { result } = renderHook(() => useApp(), { wrapper: AppProvider });
    expect(result.current).toBe(mockContextValue);
  });

  it("should throw an error when used outside the AppContext provider", () => {
    expect(() => renderHook(() => useApp()).result.current).toThrow(
      "App Context Undefined"
    );
  });
});
