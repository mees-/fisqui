type OkResult<T> = { ok: true; data: T }
type ErrResult<E> = { ok: false; error: E }

export type Result<T, E> = OkResult<T> | ErrResult<E>

export function Ok<T>(data: T): Result<T, never> {
  return { ok: true, data }
}

export function isOk<T>(result: Result<T, unknown>): result is OkResult<T> {
  return result.ok
}
export function Err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

export function isErr<E>(result: Result<unknown, E>): result is ErrResult<E> {
  return !result.ok
}
