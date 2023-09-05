import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { legalSlugsQuery, legalBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import Legal from '../../components/legal/legal'
const PreviewLegal = lazy(() => import("../../components/legal/preview-legal"));

export default function Index ({ data = {}, footerData, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewLegal data={data.legalData} query={legalBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Legal data={data.legalData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  const legalData = await getClient(preview).fetch(legalBySlugQuery, {
    slug: params.slug
  })

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        legalData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(legalSlugsQuery)

    return {
      paths: paths.map((slug) => ({ params: { slug } })),
      fallback: true,
    }
  }

