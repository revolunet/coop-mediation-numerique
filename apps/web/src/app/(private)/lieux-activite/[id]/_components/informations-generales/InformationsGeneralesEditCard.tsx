'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import EditCard from '@app/web/components/EditCard'
import {
  StructureInformationsGeneralesCommandValidation,
  StructureInformationsGeneralesData,
} from '@app/web/app/structure/StructureInformationsGeneralesCommandValidation'
import { InformationsGeneralesProps } from './InformationsGeneralesProps'
import { InformationsGeneralesFields } from './InformationsGeneralesFields'
import { InformationsGeneralesView } from './InformationsGeneralesView'

export const InformationsGeneralesEditCard = (
  props: InformationsGeneralesProps,
) => {
  const form = useForm<StructureInformationsGeneralesData>({
    resolver: zodResolver(StructureInformationsGeneralesCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      noBorder
      id="informations-generales"
      title={
        <span className="fr-text-label--blue-france">
          Informations générales
        </span>
      }
      titleAs="h2"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<InformationsGeneralesFields {...props} form={form} />}
      view={<InformationsGeneralesView {...props} />}
    />
  )
}
