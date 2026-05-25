import type { Dispatch, SetStateAction } from "react";

import { useCallback, useEffect, useState } from "react";

/**
 * Stores changes to the window hash as React state.
 *
 * @template StateType - The type of the hash state.
 *
 * @param initialHash - The initial value of the hash.
 *
 * @returns A tuple containing the hash state, and a updater function to set the hash state.
 */
function useHash<StateType extends string>(
  initialHash: StateType | undefined,
): [StateType, Dispatch<SetStateAction<StateType>>] {
  const [hash, setHash] = useState<StateType>(() => {
    const hash: StateType = window.location.hash.replace("#", "") as StateType;
    return !initialHash ? hash : hash === "" ? initialHash : hash;
  });
  const hashChangeHandler = useCallback(() => {
    const hash: StateType = window.location.hash.replace("#", "") as StateType;
    setHash(!initialHash ? hash : hash === "" ? initialHash : hash);
  }, [setHash, initialHash]);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash: StateType | ((previousState: StateType) => StateType)) => {
      const resolvedHash = typeof newHash === "function" ? newHash(hash) : newHash;
      if (resolvedHash !== hash) {
        window.location.hash = resolvedHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
}

export default useHash;
