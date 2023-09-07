import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { mediaSlugsQuery, mediaBySlugQuery, mediaFiltersQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { getClient, sanityClient } from '../../../../lib/sanity.server'

import Media from '../../../../components/media/media'
const PreviewMedia = lazy(() => import("../../../../components/media/preview-media"));

export default function Index ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewMedia data={data.mediaData} 
      // filters={data.mediaFilters} 
      query={mediaBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Media data={data.mediaData} 
    // filters={data.mediaFilters} 
    footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `media__${params.slug}`

  const mediaData = await getClient(preview).fetch(mediaBySlugQuery, {
    slug: slug
  })

  // const mediaFilters = await getClient(preview).fetch(mediaFiltersQuery, {
  //   language: params.language
  // })

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
        mediaData,
        // mediaFilters,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(mediaSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      fallback: true,
    }
  }

