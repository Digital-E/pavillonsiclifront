import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { equipeBySlugQuery, equipeSlugsQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import Equipe from '../../components/equipe/equipe'
const PreviewEquipe = lazy(() => import("../../components/equipe/preview-equipe"));

export default function Index ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewEquipe data={data.equipeData} query={equipeBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Equipe data={data.equipeData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__equipe`

  const equipeData = await getClient(preview).fetch(equipeBySlugQuery, {
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
        equipeData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(equipeSlugsQuery)

  return {
    paths: paths.map(({language, slug}) => ({ params: { language } })),
    fallback: false,
  }
}

