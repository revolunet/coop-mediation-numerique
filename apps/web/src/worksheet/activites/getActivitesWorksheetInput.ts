import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { searchActivite } from '@app/web/cra/searchActivite'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { SessionUser } from '@app/web/auth/sessionUser'
import type { BuildActivitesWorksheetInput } from './buildActivitesWorksheet'

export const getActivitesWorksheetInput = async ({
  user,
  filters,
}: {
  user: SessionUser
  filters: ActivitesFilters
}): Promise<BuildActivitesWorksheetInput> => {
  const { activites, totalPages } = await searchActivite({
    mediateurId: user.mediateur?.id,
    beneficiaireId: filters.beneficiaire,
    searchParams: {
      ...filters,
      lignes: '10000000',
    },
  })

  if (totalPages > 1) {
    throw new Error('Export should not be paginated')
  }

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    initialMediateursOptions,
    lieuxActiviteOptions,
  } = await getFiltersOptionsForMediateur({
    user,
    includeBeneficiaireId: filters.beneficiaire,
  })

  const activitesFiltersLabels = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions: initialBeneficiairesOptions,
    mediateursOptions: initialMediateursOptions,
  })

  return {
    activites,
    user,
    mediateur: user,
    filters: activitesFiltersLabels,
  }
}