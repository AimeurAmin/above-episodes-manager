import { useReducer, useRef } from "react";

interface DebouceSearchType<T> {
  immediateValue: T;
  debouncedSearch: T;
}

const useDebounce =  <T>(initialValue: T) => {
  const [{ immediateValue, debouncedSearch }, updateSearch] = useReducer(
    (prev: DebouceSearchType<T>, next: Partial<DebouceSearchType<T>>) => 
      ({...prev, ...next}), {
      immediateValue: initialValue,
      debouncedSearch: initialValue
    });

  const debouceTimeout = useRef<number | undefined>();

  const updateDebounce = (search: T) => {
    updateSearch({ immediateValue: search })
    if(debouceTimeout.current) {
      clearTimeout(debouceTimeout.current);
    }
    const timeout = setTimeout(() => {
      updateSearch({ debouncedSearch: search });
      debouceTimeout.current = undefined;
    }, 500);

    debouceTimeout.current = timeout as unknown as number;
  }

  return { debouncedSearch, immediateValue, updateDebounce };
}

export default useDebounce;