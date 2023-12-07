"use client"
import { NotAuthorized } from "../components/NotAuthorized"
import { useSession } from "next-auth/react"
import BaseLayout from "../components/BaseLayout"
import { Loading } from "../components/Loading"
import { api } from "~/trpc/react"
import { useState } from "react"

export default function NewBook() {
  const { status } = useSession()
  if (status === "unauthenticated") {
    return NotAuthorized()
  }
  if (status === "loading") {
    return <Loading />
  }
  return (
    <BaseLayout subtitle="New Book">
      <main className="flex grow flex-col items-center justify-center">
        <h1 className="text-6xl">New Book</h1>
        <NewBookForm />
      </main>
    </BaseLayout>
  )
}

function NewBookForm() {
  const { mutate: createBook, status } = api.book.create.useMutation()
  const [name, setName] = useState("")
  return (
    <form className="flex flex-col" action="javascript:void(0);">
      <label>
        Name
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button
        type="submit"
        disabled={status !== "idle"}
        onClick={() => {
          if (name === "") {
            return
          }
          createBook({ name })
        }}
      >
        Create
      </button>
    </form>
  )
}
