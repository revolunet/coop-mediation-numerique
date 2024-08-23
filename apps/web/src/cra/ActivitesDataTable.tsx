import type { Prisma } from '@prisma/client'
import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { accompagnementTypeLabels } from '@app/web/cra/cra'
import ActiviteRowShowDetailsButton from '@app/web/cra/ActiviteRowShowDetailsButton'
import { Activite } from '@app/web/cra/activitesQueries'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import styles from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage.module.css'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  Activite,
  Prisma.ActiviteMediateurWhereInput,
  Prisma.ActiviteMediateurOrderByWithRelationInput
>

export const ActivitesDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-activites`,
  rowKey: ({ cra: { id } }) => id,
  rowButton: (activite) => <ActiviteRowShowDetailsButton activite={activite} />,
  columns: [
    {
      name: 'date',
      header: 'Date',
      csvHeaders: ['Date'],
      defaultSortable: true,
      defaultSortableDirection: 'desc',
      cellAsTh: true,
      sortable: true,
      csvValues: ({ cra: { date } }) => [dateAsIsoDay(date)],
      cell: ({ cra: { date } }) => dateAsDay(date),
    },
    {
      name: 'type',
      header: 'Type',
      csvHeaders: ['Type'],
      csvValues: ({ type }) => [accompagnementTypeLabels[type]],
      cell: ({ type }) => accompagnementTypeLabels[type],
      cellClassName: styles.typeCell,
      sortable: true,
    },
    {
      name: 'beneficiaire',
      header: 'Bénéficiaire',
      csvHeaders: ['Bénéficiaire'],
      csvValues: (activite) => [
        activite.type === 'collectif'
          ? `${activite.cra.participants.length + activite.cra.participantsAnonymes.total} participants`
          : getBeneficiaireDisplayName(activite.cra.beneficiaire),
      ],
      cell: (activite) =>
        activite.type === 'collectif'
          ? `${activite.cra.participants.length + activite.cra.participantsAnonymes.total} participants`
          : getBeneficiaireDisplayName(activite.cra.beneficiaire),
      cellClassName: styles.beneficiaireCell,
    },
    {
      name: 'lieu',
      header: 'Lieu',
      csvHeaders: ['Lieu'],
      csvValues: () => [],
      cell: (activite) =>
        'lieuActivite' in activite.cra && activite.cra.lieuActivite
          ? activite.cra.lieuActivite.nom
          : activite.type === 'collectif'
            ? activite.cra.lieuAccompagnementAutreCommune
              ? `${activite.cra.lieuAccompagnementAutreCommune} · ${activite.cra.lieuAccompagnementAutreCodePostal}`
              : '-'
            : activite.cra.lieuAccompagnement === 'ADistance'
              ? 'À distance'
              : activite.cra.lieuAccompagnementDomicileCommune
                ? `${activite.cra.lieuAccompagnementDomicileCommune} · ${activite.cra.lieuAccompagnementDomicileCodePostal}`
                : '-',
      cellClassName: styles.lieuCell,
    },
  ],
} satisfies ActivitesDataTableConfiguration

export type ActivitesDataTableSearchParams = DataTableSearchParams<
  ActivitesDataTableConfiguration,
  ActivitesFilters
>
