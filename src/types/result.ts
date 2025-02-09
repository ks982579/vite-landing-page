// src/types/result.ts
export type Result<T, E> = { type: "ok"; value: T } | { type: "err"; error: E };

export const Ok = <T, E>(value: T): Result<T, E> => ({
  type: "ok",
  value,
});

export const Err = <T, E>(error: E): Result<T, E> => ({
  type: "err",
  error,
});
