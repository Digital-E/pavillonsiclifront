import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { eventSlugsQuery, eventBySlugQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient, sanityClient } from '../../../lib/sanity.server'

import Event from '../../../components/event/event'
const PreviewEvent = lazy(() => import("../../../components/event/preview-event"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewEvent data={data.eventData} query={eventBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Event data={data.eventData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__evenement__${params.slug}`

  const eventData = await getClient(preview).fetch(eventBySlugQuery, {
    slug: slug
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
        eventData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(eventSlugsQuery)

    return {
      paths: paths?.map(({language, slug}) => ({ params: { language, slug: '' } })),
      fallback: true,
    }
  }

