import { z } from 'zod'
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { enforceIsAdmin } from '@app/web/server/rpc/enforceIsAdmin'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'

export const usurpationRouter = router({
  usurpUser: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(
      async ({
        input: { userId },
        ctx: { sessionToken, user: initialUser },
      }) => {
        enforceIsAdmin(initialUser)

        const user = await prismaClient.user.findUnique({
          where: {
            id: userId,
            isFixture: true,
          },
        })

        if (!user) {
          throw invalidError('User not found or user is not a fixture')
        }

        // Close potential previous usurpations
        await prismaClient.session.deleteMany({
          where: {
            usurperId: initialUser.id,
          },
        })

        await prismaClient.session.update({
          where: {
            sessionToken,
          },
          data: {
            userId: user.id,
            usurperId: initialUser.id,
          },
        })

        return user
      },
    ),
  stopUsurpation: protectedProcedure.mutation(
    async ({ ctx: { sessionToken } }) => {
      const session = await prismaClient.session.findUnique({
        where: { sessionToken },
      })

      if (!session || !session.usurperId) {
        throw forbiddenError()
      }

      const usurper = await prismaClient.user.findUnique({
        where: { id: session.usurperId },
        select: {
          id: true,
          role: true,
          name: true,
          email: true,
        },
      })

      enforceIsAdmin(usurper)

      await prismaClient.session.update({
        where: {
          sessionToken,
        },
        data: {
          userId: usurper.id,
          usurperId: null,
        },
      })

      return usurper
    },
  ),
  resetUserFixture: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ input: { userId }, ctx: { user: initialUser } }) => {
      enforceIsAdmin(initialUser)

      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
          isFixture: true,
        },
      })

      if (!user) {
        throw invalidError('User not found or user is not a fixture')
      }

      return resetFixtureUser(user)
    }),
})