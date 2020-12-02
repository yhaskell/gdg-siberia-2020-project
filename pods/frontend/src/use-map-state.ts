import { Reducer, useCallback, useReducer } from "react";

type Action<K extends string, V> = { type: "set", key: K, value: V }
  | { type: "remove", key: K }

function reducer<K extends string, V>(state: Record<K, V>, action: Action<K, V>) {
  switch (action.type) {
    case "set":
      return { ...state, [action.key]: action.value };
    case "remove":
      const newState = { ...state };
      delete newState[action.key];

      return newState;
    default:
      return state;
  }
}

export default function useMapState<K extends string, V>(initial: Record<K, V> = {} as Record<K, V>): [Record<K, V>, (key: K, value: V) => void, (key: K) => void] {
  const [data, dispatch] = useReducer<Reducer<Record<K, V>, Action<K, V>>>(reducer, initial);
  const setItem = useCallback((key: K, value: V) => dispatch({ type: "set", key, value }), []);
  const removeItem = useCallback((key: K) => dispatch({ type: "remove", key }), []);

  return [data, setItem, removeItem];
}
