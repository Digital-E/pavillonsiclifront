import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { archivesArchitecturesHepiaSlugsQuery, archivesArchitecturesHepiaBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import ArchivesArchitecturesHepia from '../../components/archives-architectures-hepia/archives-architectures-hepia'
const PreviewArchivesArchitecturesHepia = lazy(() => import("../../components/archives-architectures-hepia/archives-architectures-hepia"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewArchivesArchitecturesHepia data={data.archivesArchitecturesHepiaData} query={archivesArchitecturesHepiaBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <ArchivesArchitecturesHepia data={data.archivesArchitecturesHepiaData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__archives-architectures-hepia`

  const archivesArchitecturesHepiaData = await getClient(preview).fetch(archivesArchitecturesHepiaBySlugQuery, {
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
        archivesArchitecturesHepiaData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(archivesArchitecturesHepiaSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

