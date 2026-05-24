import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that debounces a value.
 * Returns the debounced value after the specified delay.
 *
 * @param {*} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds (default: 400ms).
 * @returns {*} The debounced value.
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
