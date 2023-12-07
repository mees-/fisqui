import { Metadata } from "next"
import { notFound } from "next/navigation"
import { api } from "~/trpc/server"
import { ErrorDisplay } from "../components/ErrorDisplay"
import { isErr, isOk } from "~/result"
import Link from "next/link"

export interface RouteParams {
  params: {
    bookId: string
  }
}

export default async function BookIndex({ params: { bookId } }: RouteParams) {
  const bookResult = await api.book.get.query(bookId)

  if (isErr(bookResult)) {
    if (bookResult.error.code === "NOT_FOUND") {
      return notFound()
    } else {
      return <ErrorDisplay error={bookResult.error} />
    }
  }
  const book = bookResult.data

  return (
    <div className="grow">
      <h1>{book.name}</h1>
      <h2>Ledgers</h2>
      <ul>
        {book.ledgers.map(ledger => (
          <li key={ledger.id}>
            <Link href={`ledger/${ledger.id}`}>{ledger.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
