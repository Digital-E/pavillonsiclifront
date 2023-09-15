import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { rencontreDeLurbanismeSlugsQuery, rencontreDeLurbanismeBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import  RencontreDeLurbanisme from '../../components/rencontre-de-l-urbanisme/rencontre-de-l-urbanisme'
const PreviewRencontreDeLurbanisme = lazy(() => import("../../components/rencontre-de-l-urbanisme/preview-rencontre-de-l-urbanisme"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewRencontreDeLurbanisme data={data.rencontreDeLurbanismeData} query={rencontreDeLurbanismeBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <RencontreDeLurbanisme data={data.rencontreDeLurbanismeData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__rencontre-de-l-urbanisme`

  const rencontreDeLurbanismeData = await getClient(preview).fetch(rencontreDeLurbanismeBySlugQuery, {
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
        rencontreDeLurbanismeData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(rencontreDeLurbanismeSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      fallback: true,
    }
  }

