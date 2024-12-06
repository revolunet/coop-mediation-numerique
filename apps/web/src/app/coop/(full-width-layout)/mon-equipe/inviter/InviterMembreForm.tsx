'use client'

import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Tag from '@codegouvfr/react-dsfr/Tag'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import {
  InviterMembreData,
  InviterMembreValidation,
} from '@app/web/equipe/InviterMembreValidation'
import { useMediateursSearch } from '@app/web/hooks/useMediateurSearch'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { FormatOptionLabel } from './FormatOptionLabel'
import { MediateurToAddOption } from './MediateurToAddOption'

const EMAIL_REGEXP =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/

const toEmail = ({ email }: { email: string }) => email

const isEmail = (email: string) => EMAIL_REGEXP.test(email)

const alreadyAddedIn = (fields: { email: string }[]) => (email: string) =>
  fields.map(toEmail).includes(email)

const emailNotIn =
  (fields: { email: string }[]) =>
  ({ data }: { data: MediateurToAddOption }) =>
    data.value != null &&
    isEmail(data.value.email) &&
    !alreadyAddedIn(fields)(data.value.email)

const InviterMembreForm = () => {
  const { loadOptions } = useMediateursSearch({
    initialMediateursOptions: [],
    allowTextValue: true,
  })

  const form = useForm<InviterMembreData>({
    resolver: zodResolver(InviterMembreValidation),
    defaultValues: { members: [] },
  })

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  })

  const onSelectMediateurAInviter = (option: MediateurToAddOption | null) => {
    if (option?.value?.email == null) return

    append([
      ...fields,
      {
        email: option.value.email,
        nom: option.value.mediateurId ? option?.label : undefined,
        mediateurId: option.value.mediateurId,
      },
    ])
  }

  const onRemoveMediateurAInviter = (index: number) => {
    remove(index)
  }

  return (
    <form action="">
      <CustomSelectFormField
        label={
          <span className="fr-display-block fr-mt-12v fr-mb-4v">
            Rechercher par nom ou adresse e-mail
          </span>
        }
        path="members"
        control={form.control}
        placeholder="Nom ou adresse e-mail"
        className="fr-mb-2v fr-mt-3v"
        loadOptions={loadOptions}
        filterOption={emailNotIn(fields)}
        onChange={onSelectMediateurAInviter}
        clearInputOnChange
        getOptionLabel={FormatOptionLabel}
      />
      {fields.length > 0 && (
        <ul className="fr-list-group fr-flex fr-flex-wrap fr-flex-gap-1v fr-mt-6v">
          {fields.map((mediateurToAdd, index) => (
            <li key={mediateurToAdd.email}>
              <Tag
                nativeButtonProps={{
                  onClick: () => onRemoveMediateurAInviter(index),
                }}
              >
                {mediateurToAdd.nom ?? mediateurToAdd.email}&nbsp;
                <span className="fr-icon-close-line fr-icon--sm" />
              </Tag>
            </li>
          ))}
        </ul>
      )}
      <hr className="fr-separator-12v" />
      <ButtonsGroup
        buttonsSize="large"
        buttons={[
          { children: 'Inviter', disabled: fields.length === 0 },
          {
            children: 'Annuler',
            priority: 'secondary',
            linkProps: { href: '/coop/mon-equipe' },
          },
        ]}
      />
    </form>
  )
}

export default withTrpc(InviterMembreForm)
