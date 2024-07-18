import { Reducer, useReducer } from "react";

export function useFormReducer<T>(def: T) {
  return useReducer<Reducer<T, Partial<T>>>(
    (prev, part) => ({ ...prev, ...part }),
    def
  );
}
