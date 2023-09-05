import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { nfjtQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import NFJT from '../components/nfjt/nfjt'
const PreviewNFJT = lazy(() => import("../components/nfjt/preview-nfjt"));

export default function Component ({ data = {}, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewNFJT data={data.data} query={nfjtQuery} footerData={data.footerData}/>    
    </PreviewSuspense>
  )
  :
  (
    <NFJT data={data.data} footerData={data.footerData}/>
  )
}


export async function getStaticProps({ preview = false, params }) {

  const data = await getClient(preview).fetch(nfjtQuery)

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

