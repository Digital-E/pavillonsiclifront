import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { mediaPageSlugsQuery, mediaPageBySlugQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { getClient, sanityClient } from '../../../../lib/sanity.server'

import Event from '../../../../components/media-page/media-page'
const PreviewMediaPage = lazy(() => import("../../../../components/media-page/preview-media-page"));

import splitSubSlug from '../../../../lib/splitSubSlug'

export default function Index ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewMediaPage data={data.mediaPageData} query={mediaPageBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Event data={data.mediaPageData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {


  let slug = `media__${params.slug}__${params.slugTwo}`

  const mediaPageData = await getClient(preview).fetch(mediaPageBySlugQuery, {
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
        mediaPageData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(mediaPageSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({
        params: { language: language , slug: splitSubSlug(slug, 1), slugTwo: splitSubSlug(slug, 2)}
      })),
      fallback: true,
    }
  }

