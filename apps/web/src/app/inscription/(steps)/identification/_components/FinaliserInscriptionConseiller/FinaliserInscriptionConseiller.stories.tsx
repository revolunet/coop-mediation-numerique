import { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionConseiller } from './FinaliserInscriptionConseiller'

export default {
  title: 'Inscription/Finaliser inscription conseiller',
  component: FinaliserInscriptionConseiller,
} as Meta<typeof FinaliserInscriptionConseiller>

type Story = StoryObj<typeof FinaliserInscriptionConseiller>

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller numérique identifié'

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'

export const MediateurTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'mediateur',
  },
}
MediateurTrouve.storyName = 'Médiateur'
