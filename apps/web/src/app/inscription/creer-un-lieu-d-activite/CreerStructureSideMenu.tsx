import React from 'react'
import CompactNavigationSideMenu from '@app/ui/components/CompactNavigationSideMenu'

const CreerStructureSideMenu = () => (
  <CompactNavigationSideMenu
    items={[
      {
        text: 'Informations',
        linkProps: { href: `#informations-generales` },
      },
      {
        text: 'Lieu accueillant du public',
        linkProps: { href: '#description' },
        items: [
          {
            text: 'Description de l’activité du lieu',
            linkProps: { href: '#description' },
          },
          {
            text: 'Informations pratiques',
            linkProps: { href: '#informations-pratiques' },
          },
        ],
      },
      {
        text: 'Services d’inclusion numérique',
        linkProps: { href: '#services-et-accompagnement' },
        items: [
          {
            text: 'Services & types d’accompagnement',
            linkProps: { href: '#services-et-accompagnement' },
          },
          {
            text: 'Modalités d’accès au service',
            linkProps: { href: '#modalites-acces-au-service' },
          },
          {
            text: 'Types de publics accueillis',
            linkProps: { href: '#types-publics-accueillis' },
          },
        ],
      },
    ]}
    burgerMenuButtonText="Sections"
    contentId="form"
    sticky
    fullHeight
  />
)

export default CreerStructureSideMenu