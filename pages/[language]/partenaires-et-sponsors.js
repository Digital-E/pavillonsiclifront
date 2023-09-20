import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { partenairesEtSponsorsSlugsQuery, partenairesEtSponsorsBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import PartenairesEtSponsors from '../../components/partenaires-et-sponsors/partenaires-et-sponsors'
const PreviewPartenairesEtSponsors = lazy(() => import("../../components/partenaires-et-sponsors/partenaires-et-sponsors"));

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewPartenairesEtSponsors data={data.partenairesEtSponsorsData} query={partenairesEtSponsorsBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <PartenairesEtSponsors data={data.partenairesEtSponsorsData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__partenaires-et-sponsors`

  const partenairesEtSponsorsData = await getClient(preview).fetch(partenairesEtSponsorsBySlugQuery, {
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
        partenairesEtSponsorsData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(partenairesEtSponsorsSlugsQuery)

    return {
      paths: paths.map(({language, slug}) => ({ params: { language } })),
      fallback: true,
    }
  }

