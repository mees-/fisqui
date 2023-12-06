import { env } from "~/env"

interface ErrorDisplayProps {
  error: Error
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (env.NODE_ENV === "development") {
    return (
      <div>
        <h3>Something went wrong</h3>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Something went wrong</h3>
        <p>We are sorry for the inconvenience</p>
      </div>
    )
  }
}
