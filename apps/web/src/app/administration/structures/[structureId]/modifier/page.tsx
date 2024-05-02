import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import { toTitleCase } from '@app/web/utils/toTitleCase'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import { getStructureDataForForm } from '@app/web/structure/getStructureDataForForm'
import StructureEdition from '@app/web/structure/StructureEdition'

export const metadata: Metadata = {
  title: metadataTitle('Modifier une structure'),
}

const Page = async ({ params }: { params: { structureId: string } }) => {
  const structure = await getStructureDataForForm({
    structureId: params.structureId,
  })

  if (!structure) {
    return notFound()
  }

  return (
    <>
      <SkipLinksPortal />

      <div className="">
        <AdministrationBreadcrumbs
          parents={[
            {
              label: 'Structures',
              linkProps: { href: `/administration/structures` },
            },
          ]}
          currentPage={toTitleCase(structure.nom, { noUpper: true })}
        />

        <main id={contentId} className="fr-mt-12v fr-pb-20v">
          <StructureEdition structure={structure} />
        </main>
      </div>
    </>
  )
}

export default Page