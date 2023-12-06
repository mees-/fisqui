import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"
import BaseLayout from "./components/BaseLayout"
import { SignInButton } from "./components/client"
import Link from "next/link"
import { isErr, isOk } from "~/result"

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <BaseLayout>
      <main className="flex grow flex-col items-center justify-center">
        <h1 className="text-6xl">Fisqui</h1>
        <p className="text-xl">A simple app to manage your finances</p>
        {session ? `Hello! ${session.user.name ?? "unknown user"}` : <SignInButton />}
        {<BooksView />}
      </main>
    </BaseLayout>
  )
}

async function BooksView() {
  const session = await getServerAuthSession()
  const books = await api.book.list.query()
  if (!session) {
    return null
  }
  return (
    <>
      <h2 className="text-3xl">Books</h2>
      <ul>
        {isOk(books) &&
          books.data.map(book => (
            <li key={book.id}>
              <Link href={`/${book.id}`}>{book.name}</Link>
            </li>
          ))}
      </ul>
      {(isErr(books) || books.data.length === 0) && (
        <p>
          You don't have any books yet. <Link href="/new-book">Create one</Link>
        </p>
      )}
    </>
  )
}
