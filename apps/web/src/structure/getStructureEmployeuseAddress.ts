import { prismaClient } from '@app/web/prismaClient'

export const getStructureEmployeuseAddress = (userId: string) =>
  prismaClient.employeStructure.findFirst({
    where: {
      userId,
      suppression: null,
    },
    orderBy: {
      creation: 'desc',
    },
    select: {
      id: true,
      structure: {
        select: {
          nom: true,
          adresse: true,
          commune: true,
          codePostal: true,
          codeInsee: true,
          complementAdresse: true,
          siret: true,
          rna: true,
          typologies: true,
        },
      },
    },
  })
