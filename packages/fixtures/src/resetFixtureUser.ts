import { prismaClient } from '@app/web/prismaClient'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { fixtureUsers } from '@app/fixtures/users'

export const resetFixtureUser = async ({ id }: { id: string }) => {
  const userId = id

  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: sessionUserSelect,
  })

  if (!user) {
    throw new Error(`User with id ${id} not found`)
  }

  const userFixture = fixtureUsers.find((u) => u.id === userId)

  if (!user.isFixture || !userFixture) {
    throw new Error(`User with id ${id} is not a fixture user`)
  }

  await prismaClient.employeStructure.deleteMany({
    where: {
      userId,
    },
  })

  // Delete mediateur, mediateurEnActivite, mediateurCoordonne, conseillerNumerique
  if (user.mediateur?.id) {
    const mediateurId = user.mediateur.id

    await prismaClient.activite.deleteMany({
      where: {
        mediateurId,
      },
    })

    await prismaClient.craDemarcheAdministrative.deleteMany({
      where: {
        creeParMediateurId: mediateurId,
      },
    })

    await prismaClient.participantAtelierCollectif.deleteMany({
      where: {
        craCollectif: {
          creeParMediateurId: mediateurId,
        },
      },
    })

    await prismaClient.participantsAnonymesCraCollectif.deleteMany({
      where: {
        craCollectif: {
          creeParMediateurId: mediateurId,
        },
      },
    })

    await prismaClient.craCollectif.deleteMany({
      where: {
        creeParMediateurId: mediateurId,
      },
    })

    await prismaClient.craIndividuel.deleteMany({
      where: {
        creeParMediateurId: mediateurId,
      },
    })

    await prismaClient.mediateurEnActivite.deleteMany({
      where: {
        mediateurId,
      },
    })

    await prismaClient.mediateurCoordonne.deleteMany({
      where: {
        mediateurId,
      },
    })

    await prismaClient.beneficiaire.deleteMany({
      where: {
        mediateurId,
      },
    })

    await prismaClient.conseillerNumerique.deleteMany({
      where: {
        mediateurId,
      },
    })

    await prismaClient.mediateur.delete({
      where: {
        id: mediateurId,
      },
    })
  }

  // Delete coordinateur and mediateurCoordonne
  if (user.coordinateur) {
    const coordinateurId = user.coordinateur.id
    await prismaClient.mediateurCoordonne.deleteMany({
      where: {
        coordinateurId,
      },
    })

    await prismaClient.coordinateur.delete({
      where: {
        id: coordinateurId,
      },
    })
  }

  await prismaClient.user.delete({
    where: {
      id,
    },
  })

  return prismaClient.user.create({
    data: userFixture,
    select: sessionUserSelect,
  })
}
