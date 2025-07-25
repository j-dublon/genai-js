import { useCallback, useEffect, useState } from "react";

/**
 * Parses and returns stored values from `storageArea` for a given `key`. If a
 * problem occurs reading the value it will return `undefined`.
 */
export function getStorageValue<T>(key: string): T | undefined {
  let value: T | undefined;
  const serialized = window.localStorage.getItem(key);

  if (serialized !== null) {
    try {
      value = JSON.parse(serialized) as T;
    } catch {
      console.error(`Unable to parse '${key}' from localStorage`);
    }
  }
  return value;
}

/**
 * A reactive interface to browser storage that can retrieve and set a value.
 *
 * Returns an array similar to `useState`.  The current value of `key` is in
 * index 0 and a setter function in index 1. If `key` is currently unset then
 * null will be returned unless `initialValue` is provided in which case
 * `initialValue` is returned instead.
 *
 * Similar to `useState`, the setter function accepts a direct value or a
 * callback function can be called with the first parameter being the current
 * value.
 *
 * @param key - the key to assign and retrieve from
 * @param [initialValue] - if the storage area's key is unset use initialValue instead
 *
 * @example
 * const [someValue, setSomeValue] = useBrowserStorage('some_key')
 *
 * @example
 * const [someValue, setSomeValue] = useBrowserStorage('some_key', { complex: 'type' })
 */
export function useBrowserStorage<T>(
  key: string,
  initialValue?: T,
): [T | null, (state: T | ((prevState: T) => T)) => void] {
  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }

  const [stateValue, setStateValue] = useState(
    initialValue === undefined ? null : initialValue,
  );

  const set = useCallback(
    (state: unknown | ((prevState: unknown) => unknown)) => {
      const nextState = state instanceof Function ? state(stateValue) : state;
      const serialized = JSON.stringify(nextState);
      window.localStorage.setItem(key, serialized);
      setStateValue(nextState);
    },
    [key, stateValue],
  );

  useEffect(() => {
    const nextState = getStorageValue<T>(key);
    if (nextState !== undefined) {
      setStateValue(nextState);
    }
  }, [key]);

  return [stateValue, set];
}
