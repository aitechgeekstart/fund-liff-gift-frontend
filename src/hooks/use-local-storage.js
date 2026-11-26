"use client";
import { useCallback, useState } from "react";

/**
 * A custom React Hook for managing state that persists in the browser's Local Storage.
 * * @param {string} key The key under which the state will be stored in Local Storage.
 * @param {any} initialValue The initial value for the state if no value is found in storage.
 * @returns {[any, (value: any | ((prevValue: any) => any)) => void, () => void]}
 * [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  // Check for window to ensure it runs correctly on the client side (e.g., during hydration)
  const isClient = typeof window !== "undefined";

  // 1. Get the initial value from Local Storage or use the provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or if not found, return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error occurs (e.g., storage limit exceeded or invalid JSON),
      // return initial value and log the error.
      console.error("Error reading local storage:", error);
      return initialValue;
    }
  });

  // 2. A callback to set the value in state and local storage
  const setValue = useCallback(
    (value) => {
      if (!isClient) {
        return;
      }

      try {
        // Allow value to be a function, so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Update React state
        setStoredValue(valueToStore);

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error writing to local storage:", error);
      }
    },
    [key, storedValue, isClient],
  );

  // 3. A callback to remove the value from state and local storage
  const removeValue = useCallback(() => {
    if (!isClient) {
      return;
    }

    try {
      // Remove from local storage
      window.localStorage.removeItem(key);

      // Reset React state to null (or initialValue if preferred)
      setStoredValue(null);
    } catch (error) {
      console.error("Error removing from local storage:", error);
    }
  }, [key, isClient]);

  // The hook returns the current value, the setter function, and the remover function
  return [storedValue, setValue, removeValue];
}
