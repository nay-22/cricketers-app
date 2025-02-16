import { useEffect, useState } from "react";

/**
 * usePersistedState Hook
 *
 * Manages a state that is synchronized with localStorage.
 *
 * @template T - The type of the state value
 *
 * @param {T} initialState - The initial state value
 * @param {string} key - The localStorage key for persistence
 *
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The current state and a function to update it
 */

const usePersistedState = <T>(initialState: T, key: string) => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedStateString = localStorage.getItem(key);
      return storedStateString ? JSON.parse(storedStateString) : initialState;
    } catch (e) {
      console.error("Error reading localStorage:", e);
      return initialState;
    }
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    try {
      timer = setTimeout(() => {
        localStorage.setItem(key, JSON.stringify(state));
      }, 300);
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    } finally {
      return () => {
        clearTimeout(timer);
      };
    }
  }, [state, key]);

  return [state, setState] as const;
};

export default usePersistedState;
