import type { Activite } from '@app/web/cra/activitesQueries'

export const createModifierActiviteLink = (
  {
    cra: { id },
    type,
  }: {
    type: Activite['type']
    cra: {
      id: Activite['cra']['id']
    }
  },
  { retour }: { retour?: string } = {},
) => {
  const retourQueryParam = retour ? `?retour=${retour}` : ''

  if (type === 'demarche') {
    return `/coop/mes-activites/cra/administratif/${id}${retourQueryParam}`
  }

  if (type === 'individuel') {
    return `/coop/mes-activites/cra/individuel/${id}${retourQueryParam}`
  }

  if (type === 'collectif') {
    return `/coop/mes-activites/cra/collectif/${id}${retourQueryParam}`
  }

  throw new Error('Invalid activity type for modifier link')
}
