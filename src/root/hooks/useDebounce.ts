import { useEffect, useState } from "react";

/**
 * Assign a variable a given value after a given amount of milliseconds.
 *
 * @template ValueType The type of the value to set.
 *
 * @param value - The value to assign.
 * @param delay - The amount of milliseconds to wait before assigning the value.
 *
 * @returns The input value after a given number of seconds.
 */
function useDebounce<ValueType>(value: ValueType, delay: number = 500): ValueType {
  const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
