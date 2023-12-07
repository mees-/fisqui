import { createTRPCRouter } from "~/server/api/trpc"

import bookRouter from "./routers/book"
import transactionRouter from "./routers/transaction"

export const appRouter = createTRPCRouter({
  book: bookRouter,
  transaction: transactionRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
