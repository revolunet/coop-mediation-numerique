import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import CraIndividuelPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/CraIndividuelPage'
import { getCraIndividuelDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/getCraIndividuelDataDefaultValuesFromExisting'

const UpdateCraIndividuelPage = async ({
  params: { id },
  searchParams: { retour } = {},
}: {
  params: {
    id: string
  }
  searchParams?: {
    retour?: string
  }
}) => {
  const user = await getAuthenticatedMediateur()

  const defaultValues = await getCraIndividuelDataDefaultValuesFromExisting({
    id,
    mediateurId: user.mediateur.id,
  })

  if (!defaultValues) {
    notFound()
    return null
  }

  const lieuxActiviteOptions = await getLieuxActiviteOptions({
    mediateurIds: [user.mediateur.id],
  })

  if (!defaultValues.structureId) {
    defaultValues.structureId = lieuxActiviteOptions.at(0)?.value ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur.id,
      includeBeneficiaireId: defaultValues.beneficiaire?.id ?? undefined,
    })

  return (
    <CraIndividuelPage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      retour={retour}
    />
  )
}

export default UpdateCraIndividuelPage
