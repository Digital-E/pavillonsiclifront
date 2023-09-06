import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { aboutQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import About from '../../components/about/about'
const PreviewAbout = lazy(() => import("../../components/about/preview-about"));

export default function Index ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewAbout data={data.data} query={aboutQuery} footerData={data.footerData}/>    
    </PreviewSuspense>
  )
  :
  (
    <About data={data.data} footerData={data.footerData}/>
  )
}


export async function getStaticProps({ preview = false, params }) {

  const data = await getClient(preview).fetch(aboutQuery)

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        data,
        menuData,
        footerData
      }
    }
  }
}

