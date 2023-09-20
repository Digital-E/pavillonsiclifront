import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { laFondationPavillonSicliSlugsQuery, laFondationPavillonSicliBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import LaFondationPavillonSicli from '../../components/la-fondation-pavillon-sicli/la-fondation-pavillon-sicli'
const PreviewLaFondationPavillonSicli = lazy(() => import("../../components/la-fondation-pavillon-sicli/preview-la-fondation-pavillon-sicli"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewLaFondationPavillonSicli data={data.laFondationPavillonSicliData} query={laFondationPavillonSicliBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <LaFondationPavillonSicli data={data.laFondationPavillonSicliData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__la-fondation-pavillon-sicli`

  const laFondationPavillonSicliData = await getClient(preview).fetch(laFondationPavillonSicliBySlugQuery, {
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
        laFondationPavillonSicliData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(laFondationPavillonSicliSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

