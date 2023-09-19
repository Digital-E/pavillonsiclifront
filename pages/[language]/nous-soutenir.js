import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { nousSoutenirSlugsQuery, nousSoutenirBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import NousSoutenir from '../../components/archives-architectures-hepia/archives-architectures-hepia'
const PreviewNousSoutenir = lazy(() => import("../../components/archives-architectures-hepia/archives-architectures-hepia"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewNousSoutenir data={data.nousSoutenirData} query={nousSoutenirBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <NousSoutenir data={data.nousSoutenirData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__nous-soutenir`

  const nousSoutenirData = await getClient(preview).fetch(nousSoutenirBySlugQuery, {
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
        nousSoutenirData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(nousSoutenirSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

