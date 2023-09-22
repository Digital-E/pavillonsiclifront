import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { archiveSlugsQuery, archiveBySlugQuery, archiveFiltersQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient, sanityClient } from '../../../lib/sanity.server'

import Agenda from '../../../components/agenda/agenda'
const PreviewAgenda = lazy(() => import("../../../components/agenda/preview-agenda"));

export default function Index ({ data = {}, preview = false }) {

  if(data.archiveData === undefined) return null

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewAgenda data={data.archiveData} filters={data.archiveFilters} isDark={true} query={archiveBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Agenda data={data.archiveData} filters={data.archiveFilters} isDark={true} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {


  let slug = `${params.language}__archive__${params.slug}`

  const archiveData = await getClient(preview).fetch(archiveBySlugQuery, {
    slug: slug
  })

  const archiveFilters = await getClient(preview).fetch(archiveFiltersQuery, {
    language: params.language
  })

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    language: params.language
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    language: params.language
  });


  return {
    props: {
      preview,
      data: {
        archiveData,
        archiveFilters,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(archiveSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      fallback: true,
    }
  }

