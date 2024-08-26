import { prismaClient } from '@app/web/prismaClient'

export const getAteliersCollectifsParticipants = async (
  mediateurId: string,
): Promise<number> => {
  const result = await prismaClient.$queryRaw<[{ count: number }]>`
    SELECT 
      COUNT(DISTINCT participant.id) as count
    FROM 
      beneficiaires beneficiaire
    JOIN 
      participants_ateliers_collectifs participant 
      ON beneficiaire.id = participant.beneficiaire_id
    JOIN 
      cras_collectifs cras 
      ON participant.cra_collectif_id = cras.id
    WHERE 
      beneficiaire.mediateur_id = ${mediateurId}::UUID
      AND cras.suppression IS NULL;
  `

  return Number(result[0].count)
}
