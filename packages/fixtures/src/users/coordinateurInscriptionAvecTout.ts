import type { Prisma } from '@prisma/client'
import { givenUser } from '../givenUser'
import { centreSocial, mediateque, structureEmployeuse } from '../structures'

export const coordinateurInscriptionAvecToutCoordinateurId =
  'b0ebe56a-b1eb-49c0-9963-26dbbaa1c15e'

export const coordinateurInscriptionAvecTout = givenUser({
  id: '057c3fce-3c7e-4bc7-9596-8d30ef559c1a',
  firstName: 'Coordinateur',
  lastName: 'Inscription avec tout',
  isFixture: true,
  role: 'User',
  coordinateur: {
    connectOrCreate: {
      where: {
        id: coordinateurInscriptionAvecToutCoordinateurId,
      },
      create: {
        id: coordinateurInscriptionAvecToutCoordinateurId,
        conseillerNumeriqueId: 'coordinateur-inscription-avec-conseillers',
      },
    },
  },
  mediateur: {
    connectOrCreate: {
      where: {
        id: 'add33310-e93b-46c1-98ee-aa926bae993d',
      },
      create: {
        id: 'add33310-e93b-46c1-98ee-aa926bae993d',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'coordinateur-inscription-avec-tout',
            },
            create: {
              id: 'coordinateur-inscription-avec-tout',
            },
          },
        },
        enActivite: {
          connectOrCreate: [
            {
              where: {
                id: '0a090e89-4ac6-477b-8bf9-4c7252142270',
              },
              create: {
                id: '0a090e89-4ac6-477b-8bf9-4c7252142270',
                structureId: mediateque.id,
              },
            },
            {
              where: {
                id: 'ec85721f-2d0f-4bbb-8450-e417cdae15b5',
              },
              create: {
                id: 'ec85721f-2d0f-4bbb-8450-e417cdae15b5',
                structureId: centreSocial.id,
              },
            },
          ],
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '39c2e445-6eec-4964-aea3-0b7c6b20caef',
      },
      create: {
        id: '39c2e445-6eec-4964-aea3-0b7c6b20caef',
        structureId: structureEmployeuse.id,
      },
    },
  },
  checkConseillerNumeriqueInscription: new Date(),
  checkCoordinateurInscription: new Date(),
}) satisfies Prisma.UserCreateInput