import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { homeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import Home from '../../components/home/home'
const PreviewHome = lazy(() => import("../../components/home/preview-home"));

export default function Index ({ data = {}, preview = false }) {
  

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewHome data={data.homeData} query={homeQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Home data={data.homeData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  const homeData = await getClient(preview).fetch(homeQuery, {
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
        homeData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = ['en', 'fr'];

  return {
    paths: paths.map((language) => ({ params: { language } })),
    fallback: false,
  }
}

