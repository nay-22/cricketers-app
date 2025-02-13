import { useEffect, useState } from "react";

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
    let timer: number;
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
