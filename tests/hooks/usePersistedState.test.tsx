import React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import usePersistedState from "../../src/hooks/usePersistedState";

describe("usePersistedState Hook", () => {
  const key = "test-key";

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "getItem");
  });

  it("should initialize state from localStorage if available", () => {
    localStorage.setItem(key, JSON.stringify("stored-value"));

    const { result } = renderHook(() =>
      usePersistedState("default-value", key)
    );

    expect(result.current[0]).toBe("stored-value");
  });

  it("should use initial state if localStorage is empty", () => {
    const { result } = renderHook(() =>
      usePersistedState("default-value", key)
    );

    expect(result.current[0]).toBe("default-value");
  });

  it("should update localStorage when state changes", async () => {
    const { result } = renderHook(() =>
      usePersistedState("default-value", key)
    );

    act(() => {
      result.current[1]("new-value");
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify("new-value")
      );
    });
  });

  it("should handle JSON parse errors gracefully", () => {
    localStorage.setItem(key, "{invalid-json}");

    const { result } = renderHook(() =>
      usePersistedState("fallback-value", key)
    );

    expect(result.current[0]).toBe("fallback-value");
  });
});
