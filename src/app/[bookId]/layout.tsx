import { PropsWithChildren } from "react"
import { RouteParams } from "./page"
import BaseLayout from "../components/BaseLayout"
import { api } from "~/trpc/server"
import { isOk } from "~/result"

export async function generateMetadata({ params: { bookId } }: RouteParams): Promise<Metadata> {
  const bookResult = await api.book.get.query(bookId)
  if (isOk(bookResult)) {
    const book = bookResult.data
    return {
      title: `Fisqui - ${book.name}`,
      description: `Overview of ${book.name}`,
    }
  } else {
    return {
      title: `fisqui - Not found`,
      description: `Book  not found`,
    }
  }
}

export default async function BookIndexLayout({ params: { bookId }, children }: PropsWithChildren<RouteParams>) {
  const bookResult = await api.book.get.query(bookId)
  if (isOk(bookResult)) {
    return <BaseLayout subtitle={bookResult.data.name}>{children}</BaseLayout>
  } else {
    return <BaseLayout subtitle="Not found">{children}</BaseLayout>
  }
}
