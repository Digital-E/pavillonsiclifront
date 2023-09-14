import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { donateursSlugsQuery, donateursBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import Donateurs from '../../components/donateurs/donateurs'
const PreviewDonateurs = lazy(() => import("../../components/donateurs/donateurs"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewDonateurs data={data.donateursData} query={donateursBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Donateurs data={data.donateursData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__donateurs`

  const donateursData = await getClient(preview).fetch(donateursBySlugQuery, {
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
        donateursData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(donateursSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

