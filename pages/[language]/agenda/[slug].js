import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { agendaSlugsQuery, agendaBySlugQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient, sanityClient } from '../../../lib/sanity.server'

import Agenda from '../../../components/agenda/agenda'
const PreviewAgenda = lazy(() => import("../../../components/agenda/preview-agenda"));

export default function Index ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewAgenda data={data.agendaData} query={agendaBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Agenda data={data.agendaData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  const agendaData = await getClient(preview).fetch(agendaBySlugQuery, {
    slug: params.slug
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
      fallback: true,
    }
  }

