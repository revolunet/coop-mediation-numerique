import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { ComingSoon } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/_components/ComingSoon'
import { OutilPageData } from '../outilPageData'
import { Access } from './_components/Access'
import { Features } from './_components/Features'
import { Hero } from './_components/Hero'

export const Outil = ({
  notice,
  title,
  illustration,
  illustrationWidth,
  logo,
  description,
  website,
  features,
  access,
  accessComponent,
}: OutilPageData) => (
  <CoopPageContainer size={894}>
    <CoopBreadcrumbs
      parents={[
        { label: 'Mes outils', linkProps: { href: '/coop/mes-outils' } },
      ]}
      currentPage={title}
    />
    <HeaderBackLink className="fr-mb-3w" />
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      {notice ? <ComingSoon text={notice} /> : null}
      <Hero
        title={title}
        illustration={illustration}
        illustrationWidth={illustrationWidth}
        logo={logo}
        description={description}
        website={website}
      />
      <section className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-xl-7 fr-col-12">
          <div className="fr-border fr-border-radius--8 fr-p-4w fr-height-full">
            {features != null && <Features features={features} />}
          </div>
        </div>
        <div className="fr-col-xl-5 fr-col-12">
          <div className="fr-border fr-border-radius--8 fr-px-3w fr-py-4w fr-height-full">
            {accessComponent || (access ? <Access {...access} /> : null)}
          </div>
        </div>
      </section>
    </main>
  </CoopPageContainer>
)
