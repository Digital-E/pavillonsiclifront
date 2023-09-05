import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { homeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import Home from '../../components/home/home'
const PreviewHome = lazy(() => import("../../components/home/preview-home"));

export default function Index ({ data = {}, preview = false }) {

  console.log(data)

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewHome data={data.homeData} query={homeQuery} />    
    </PreviewSuspense>
  )
  :
  (
    <Home data={data.homeData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  const homeData = await getClient(preview).fetch(homeQuery, {
    language: params.lang
  })

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    language: params.lang
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    language: params.lang
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
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}

