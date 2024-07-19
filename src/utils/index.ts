import { Reducer, useCallback, useReducer } from "react";

export const useFormReducer = <T>(def: T) => {
  const [value, update] = useReducer<Reducer<T, Partial<T>>>(
    (prev, part) => ({ ...prev, ...part }),
    def
  );

  const register = useCallback(
    (name: keyof T) => {
      const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        update({ [name]: e.target.value } as Partial<T>);
      return {
        onChange,
        value: value[name],
      };
    },
    [value]
  );

  return { value, register };
};
