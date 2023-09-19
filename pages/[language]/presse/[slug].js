import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { pressSlugsQuery, pressBySlugQuery, pressFiltersQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient, sanityClient } from '../../../lib/sanity.server'

import Press from '../../../components/press/press'
const PreviewPress = lazy(() => import("../../../components/press/preview-press"));

export default function Index ({ data = {}, preview = false }) {

  if(data.pressData === undefined) return null
  
  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewPress data={data.pressData} filters={data.pressFilters} query={pressBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Press data={data.pressData} filters={data.pressFilters} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__presse__${params.slug}`

  const pressData = await getClient(preview).fetch(pressBySlugQuery, {
    slug: slug
  })

  const pressFilters = await getClient(preview).fetch(pressFiltersQuery, {
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
        pressData,
        pressFilters,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(pressSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      fallback: true,
    }
  }

