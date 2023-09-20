import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { agendaSlugsQuery, agendaBySlugQuery, agendaFiltersQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient, sanityClient } from '../../../lib/sanity.server'

import Agenda from '../../../components/agenda/agenda'
const PreviewAgenda = lazy(() => import("../../../components/agenda/preview-agenda"));

export default function Index ({ data = {}, preview = false }) {

  if(data.agendaData === undefined) return null

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewAgenda data={data.agendaData} filters={data.agendaFilters} query={agendaBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Agenda data={data.agendaData} filters={data.agendaFilters} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__agenda__${params.slug}`

  const agendaData = await getClient(preview).fetch(agendaBySlugQuery, {
    slug: slug
  })

  const agendaFilters = await getClient(preview).fetch(agendaFiltersQuery, {
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
        agendaData,
        agendaFilters,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(agendaSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      fallback: true
    }
  }

