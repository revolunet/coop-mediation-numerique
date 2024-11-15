import { ObjectId } from 'mongodb'
import {
  conseillerNumeriqueMongoCollection,
  objectIdFromString,
} from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { cleanConseillerNumeriqueV1Document } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import {
  MiseEnRelationConseillerNumeriqueV1MinimalProjection,
  MiseEnRelationV1MinimalProjection,
} from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import { getActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/getActiveMiseEnRelation'
import { fetchConseillersCoordonnes } from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'

export const fetchConseillerNumeriqueV1Data = async (
  input:
    | {
        email: string
        v1ConseillerId?: undefined
      }
    | {
        email?: undefined
        v1ConseillerId: string
      },
): Promise<ConseillerNumeriqueV1Data | null> => {
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const email = input.email?.trim().toLowerCase()
  const id = input.v1ConseillerId
    ? objectIdFromString(input.v1ConseillerId)
    : null

  if (!id && !email) {
    return null
  }

  // Mongodb select but only the fields we need
  const conseillerDocument = await conseillerCollection.findOne(
    id
      ? {
          _id: id,
          deletedAt: { $in: [null, undefined] },
        }
      : {
          deletedAt: { $in: [null, undefined] },
          emailPro: { $regex: `^${email}$`, $options: 'i' },
        },
  )

  if (!conseillerDocument) return null

  const miseEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  const miseEnRelations = (await miseEnRelationCollection
    .find(
      {
        'conseillerObj._id': conseillerDocument._id,
      },
      {
        projection: MiseEnRelationV1MinimalProjection,
      },
    )
    .toArray()) as unknown as MiseEnRelationConseillerNumeriqueV1MinimalProjection[]

  const permanencesCollection =
    await conseillerNumeriqueMongoCollection('permanences')

  const permanences = (await permanencesCollection
    .find({ conseillers: conseillerDocument._id }) // Where "conseillers" array field  CONTAINS conseiller id
    .toArray()) as unknown as {
    _id: ObjectId
    estStructure: boolean
    nomEnseigne: string
    numeroTelephone: string | null
    email: string | null
    siteWeb: string | null
    siret: string
    adresse: {
      numeroRue: string
      rue: string
      codePostal: string
      ville: string
      codeCommune: string
    }
    location: {
      type: 'Point'
      coordinates: number[]
    }
    horaires: {
      matin: string[]
      apresMidi: string[]
    }[]
    typeAcces: string[]
    conseillers: ObjectId[]
    lieuPrincipalPour: ObjectId[]
    conseillersItinerants: ObjectId[]
    structure: {
      _id: ObjectId
    }
    updatedAt: Date
    updatedBy: ObjectId
    nonAffichageCarto: boolean
  }[]

  const conseillersCoordonnes = conseillerDocument.estCoordinateur
    ? await fetchConseillersCoordonnes({
        coordinateurV1Id: conseillerDocument._id.toString('hex'),
      })
    : null

  return conseillerDocument
    ? {
        conseiller: cleanConseillerNumeriqueV1Document(conseillerDocument),
        miseEnRelations,
        miseEnRelationActive: getActiveMiseEnRelation(miseEnRelations),
        permanences,
        conseillersCoordonnes,
      }
    : null
}
