import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { enforceIsMediateur } from '@app/web/server/rpc/enforceIsMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import {
  BeneficiaireData,
  BeneficiaireValidation,
} from '@app/web/beneficiaire/BeneficiaireValidation'
import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'

const checkExistingBeneficiaire = async ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId: string | null | undefined
  mediateurId: string
}) => {
  if (!beneficiaireId) {
    return null
  }
  const existingBeneficiaire = await prismaClient.beneficiaire.findUnique({
    where: {
      id: beneficiaireId,
      suppression: null,
    },
  })
  // Enforce that the beneficiaire is created by the current mediateur
  if (!existingBeneficiaire) {
    throw invalidError('Beneficiaire not found')
  }
  if (existingBeneficiaire.mediateurId !== mediateurId) {
    throw invalidError('Beneficiaire not created by current mediateur')
  }

  return existingBeneficiaire
}

const beneficiaireCreateInputFromForm = ({
  mediateurId,
  prenom,
  nom,
  telephone,
  email,
  dateNaissance,
  anneeNaissance,
  adresse,
  communeResidence,
  genre,
  trancheAge,
  statutSocial,
  notes,
}: BeneficiaireData): Prisma.BeneficiaireCreateInput => ({
  mediateur: {
    connect: { id: mediateurId },
  },
  prenom,
  nom,
  telephone: telephone ?? undefined,
  email: email ?? undefined,
  dateNaissance: dateNaissance ?? undefined,
  anneeNaissance: anneeNaissance ?? undefined,
  adresse: adresse ?? undefined,
  genre: genre ?? undefined,
  trancheAge: trancheAge ?? undefined,
  statutSocial: statutSocial ?? undefined,
  notes: notes ?? undefined,
  commune: communeResidence?.nom ?? undefined,
  communeCodePostal: communeResidence?.codePostal ?? undefined,
  communeCodeInsee: communeResidence?.codeInsee ?? undefined,
})

export const beneficiairesRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query }, ctx: { user } }) =>
      searchBeneficiaire(query, user),
    ),
  createOrUpdate: protectedProcedure
    .input(BeneficiaireValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      const { id, mediateurId } = input

      // Enforce user can create CRA for given mediateurId (for now only self)
      if (mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot beneficiary for another mediateur')
      }

      await checkExistingBeneficiaire({
        beneficiaireId: id,
        mediateurId,
      })

      const data = beneficiaireCreateInputFromForm(input)

      if (id) {
        const updated = await prismaClient.beneficiaire.update({
          where: { id },
          data,
        })

        return updated
      }

      const newId = v4()
      const created = await prismaClient.beneficiaire.create({
        data: {
          ...data,
          id: newId,
          mediateur: {
            connect: { id: mediateurId },
          },
        },
      })

      return created
    }),
})
