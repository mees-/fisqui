import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { Err, Ok } from "~/result"
import { ledgerType } from "@prisma/client"

const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.db.book.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
        },
      })

      if (!book) {
        return Err(
          new TRPCError({
            message: "Failed to create book",
            code: "BAD_REQUEST",
          }),
        )
      }
      return Ok(book)
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const books = await ctx.db.book.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    })
    return Ok(books)
  }),

  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const book = await ctx.db.book.findUnique({
      where: {
        id: input,
      },
      include: {
        ledgers: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })
    if (!book) {
      return Err(
        new TRPCError({
          message: "Book not found",
          code: "NOT_FOUND",
        }),
      )
    }
    return Ok(book)
  }),

  createLedger: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        name: z.string(),
        type: z.enum([ledgerType.BALANCE, ledgerType.CHANGE]),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ledger = await ctx.db.ledger.create({
        data: {
          name: input.name,
          type: input.type,
          description: input.description,
          bookId: input.bookId,
        },
      })

      if (!ledger) {
        return Err(
          new TRPCError({
            message: "Failed to create ledger",
            code: "BAD_REQUEST",
          }),
        )
      }
      return Ok({
        id: ledger.id,
        name: ledger.name,
        description: ledger.description,
        bookId: ledger.bookId,
      })
    }),
  listTransactions: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const ledger = await ctx.db.ledger.findUnique({
      where: {
        id: input,
        book: {
          userId: ctx.session.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        entries: {
          select: {
            id: true,
            amount: true,
            description: true,
            transaction: {
              select: {
                id: true,
                description: true,
                date: true,
              },
            },
          },
        },
        book: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!ledger) {
      return Err(
        new TRPCError({
          message: "Ledger not found",
          code: "NOT_FOUND",
        }),
      )
    }

    return Ok(ledger)
  }),
})

export default bookRouter
