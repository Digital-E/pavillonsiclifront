import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { leBatimentSlugsQuery, leBatimentBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import LeBatiment from '../../components/le-batiment/le-batiment'
const PreviewLeBatiment = lazy(() => import("../../components/le-batiment/le-batiment"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewLeBatiment data={data.leBatimentData} query={leBatimentBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <LeBatiment data={data.leBatimentData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__le-batiment`

  const leBatimentData = await getClient(preview).fetch(leBatimentBySlugQuery, {
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
        leBatimentData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(leBatimentSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

