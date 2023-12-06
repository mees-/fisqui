import { PropsWithChildren } from "react"
import { RouteParams } from "./page"
import BaseLayout from "../components/BaseLayout"
import { api } from "~/trpc/server"
import { isOk } from "~/result"

export default async function BookIndexLayout({ params: { bookId }, children }: PropsWithChildren<RouteParams>) {
  const bookResult = await api.book.get.query(bookId)
  if (isOk(bookResult)) {
    return <BaseLayout subTitle={bookResult.data.name}>{children}</BaseLayout>
  } else {
    return <BaseLayout subTitle="Not found">{children}</BaseLayout>
  }
}
