import type { Prisma } from '@prisma/client'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { SearchBeneficiaireResultRow } from '@app/web/beneficiaire/searchBeneficiaire'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'

export type BeneficiairesDataTableConfiguration = DataTableConfiguration<
  SearchBeneficiaireResultRow,
  Prisma.BeneficiaireWhereInput,
  Prisma.BeneficiaireOrderByWithRelationInput
>

export const BeneficiairesDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-beneficiaires`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/coop/mes-beneficiaires/${id}` }),
  columns: [
    {
      name: 'nom',
      header: 'Nom',
      csvHeaders: ['Nom'],
      csvValues: ({ nom }) => [nom],
      cell: ({ nom }) => nom,
      orderBy: (direction) => [
        {
          nom: direction,
        },
      ],
    },
    {
      name: 'prenom',
      header: 'Prénom',
      csvHeaders: ['Prénom'],
      csvValues: ({ prenom }) => [prenom],
      cell: ({ prenom }) => prenom,
      orderBy: (direction) => [
        {
          prenom: direction,
        },
      ],
    },
    {
      name: 'ajout',
      header: 'Ajouté le',
      csvHeaders: ['Ajouté le'],
      csvValues: ({ creation }) => [creation.toLocaleString()],
      cell: ({ creation }) => dateAsDayAndTime(creation),
      defaultSortable: true,
      orderBy: (direction) => [
        {
          creation: direction,
        },
      ],
    },
    {
      name: 'annee-naissance',
      header: 'Année de naissance',
      csvHeaders: ['Année de naissance'],
      csvValues: ({ anneeNaissance }) => [anneeNaissance],
      cell: ({ anneeNaissance }) => anneeNaissance || '-',
      cellClassName: 'fr-text--right',
      orderBy: (direction) => [
        {
          anneeNaissance: direction,
        },
      ],
    },
    {
      name: 'accompagnements',
      header: 'Accompagnements',
      csvHeaders: ['Accompagnements'],
      csvValues: ({ totalCrasCount }) => [totalCrasCount],
      cell: ({ totalCrasCount }) => totalCrasCount,
      cellClassName: 'fr-text--right',
    },
  ],
} satisfies BeneficiairesDataTableConfiguration

export type BeneficiairesDataTableSearchParams =
  DataTableSearchParams<BeneficiairesDataTableConfiguration>

export type BeneficiairesDataTableFilterValues =
  DataTableFilterValues<BeneficiairesDataTableConfiguration>
