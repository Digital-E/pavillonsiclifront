import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { projectSlugsQuery, projectBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import Project from '../../components/project/project'
const PreviewProject = lazy(() => import("../../components/project/preview-project"));

export default function Index ({ data = {}, footerData, preview = false }) {

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewProject data={data.projectData} query={projectBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <Project data={data.projectData} footerData={data.footerData} />
  )
}


export async function getStaticProps({ preview = false, params }) {

  const projectData = await getClient(preview).fetch(projectBySlugQuery, {
    slug: params.slug
  })

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        projectData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(projectSlugsQuery)

    return {
      paths: paths.map((slug) => ({ params: { slug } })),
      fallback: true,
    }
  }

