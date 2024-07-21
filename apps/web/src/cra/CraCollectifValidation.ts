import z from 'zod'
import {
  dureeAccompagnementValues,
  lieuAtelierValues,
  materielValues,
  niveauAtelierValues,
  thematiqueAccompagnementValues,
} from '@app/web/cra/cra'
import { BeneficiaireCraValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { ParticipantsAnonymesCraCollectifValidation } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'

export const CraCollectifValidation = z
  .object({
    id: z.string().uuid().nullish(), // defined if update, nullish if create
    mediateurId: z.string().uuid(), // owner of the CRA

    participants: z.array(BeneficiaireCraValidation).default([]),
    participantsAnonymes: ParticipantsAnonymesCraCollectifValidation,
    // Helper field only used in client form for type safety
    addParticipant: BeneficiaireCraValidation.nullish(),

    titreAtelier: z.string().nullish(),

    date: z
      .string({ required_error: 'Veuillez renseigner une date' })
      .date('Veuillez renseigner une date valide'),
    duree: z.enum(dureeAccompagnementValues, {
      required_error: 'Veuillez renseigner une durée',
    }),
    lieuAtelier: z.enum(lieuAtelierValues, {
      required_error: 'Veuillez renseigner un lieu',
    }),
    lieuActiviteId: z.string().uuid().nullish(),
    lieuAtelierAutreCommune: AdresseBanValidation.nullish(),
    materiel: z.array(z.enum(materielValues)).default([]),
    thematiques: z
      .array(z.enum(thematiqueAccompagnementValues), {
        required_error: 'Veuillez renseigner au moins une thématique',
      })
      .min(1, 'Veuillez renseigner au moins une thématique'),

    niveau: z.enum(niveauAtelierValues).nullish(),
    notes: z.string().nullish(),
  })
  // lieuActiviteId is required if lieuAtelier ===  LieuActivite
  .refine(
    (data) => {
      if (data.lieuAtelier === 'LieuActivite') {
        return !!data.lieuActiviteId
      }
      return true
    },
    {
      message: 'Veuillez renseigner le lieu d’activité',
      path: ['lieuActiviteId'],
    },
  )
  // lieuAtelierAutreCommune is required if lieuAtelier === Autre
  .refine(
    (data) => data.lieuAtelier !== 'Autre' || !!data.lieuAtelierAutreCommune,
    {
      message: 'Veuillez renseigner la commune',
      path: ['lieuAtelierAutreCommune'],
    },
  )

export type CraCollectifData = z.infer<typeof CraCollectifValidation>
