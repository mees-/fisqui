import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { DateTime } from "luxon"
import { Err, Ok } from "~/result"

const transactionRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const transaction = await ctx.db.transaction.findUnique({
      where: {
        id: input,
        entries: {
          some: {
            ledger: {
              book: {
                userId: ctx.session.user.id,
              },
            },
          },
        },
      },
      select: {
        id: true,
        description: true,
        entries: {
          select: {
            id: true,
            amount: true,
            ledger: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    if (!transaction) {
      return Err(new TRPCError({ message: "Transaction not found", code: "NOT_FOUND" }))
    }
    return Ok(transaction)
  }),
  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        entries: z.array(
          z.object({
            ledgerId: z.string(),
            amount: z.number(),
            description: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // check that entries are balanced
      const total = input.entries.reduce((acc, entry) => acc + entry.amount, 0)
      if (total !== 0) {
        throw new TRPCError({ message: "Transaction entries are not balanced", code: "BAD_REQUEST" })
      }

      const transaction = await ctx.db.transaction.create({
        data: {
          userId: ctx.session.user.id,
          description: input.description,
          date: DateTime.utc().toISO(),
          entries: {
            create: input.entries.map(entry => ({
              amount: entry.amount,
              ledgerId: entry.ledgerId,
              description: entry.description,
            })),
          },
        },
        select: {
          id: true,
          description: true,
          date: true,
          entries: {
            select: {
              id: true,
              amount: true,
              ledger: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })
      if (!transaction) {
        return Err(new TRPCError({ message: "Failed to create transaction", code: "BAD_REQUEST" }))
      }

      if (!transaction) {
        return Err(new TRPCError({ message: "Failed to create transaction", code: "BAD_REQUEST" }))
      }
      return Ok(transaction)
    }),
})

export default transactionRouter
