import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { pageProgrammeAndPageTemplateAndPageGridSlugsQuery, pageProgrammeBySlugQuery, pageTemplateBySlugQuery, pageGridBySlugQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, sanityClient } from '../../lib/sanity.server'

import  PageProgramme from '../../components/page-programme/page-programme'
const PreviewPageProgramme = lazy(() => import("../../components/page-programme/preview-page-programme"));

import  PageTemplate from '../../components/page-template/page-template'
const PreviewPageTemplate = lazy(() => import("../../components/page-template/preview-page-template"));

import  PageGrid from '../../components/page-grid/page-grid'
const PreviewPageGrid= lazy(() => import("../../components/page-grid/preview-page-grid"));

const pageProgramme = (data, preview) => {
  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewPageProgramme data={data.pageData} query={pageProgrammeBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <PageProgramme data={data.pageData} footerData={data.footerData} />
  )
}

const pageTemplate = (data, preview) => {
  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewPageTemplate data={data.pageData} query={pageTemplateBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <PageTemplate data={data.pageData} footerData={data.footerData} />
  )
}

const pageGrid = (data, preview) => {
  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewPageGrid data={data.pageData} query={pageGridBySlugQuery} footerData={data.footerData} />    
    </PreviewSuspense>
  )
  :
  (
    <PageGrid data={data.pageData} footerData={data.footerData} />
  )
}

const pageSwitch = (data, preview) => {
  switch(data?.pageData?._type) {
    case 'pageProgramme':
      return pageProgramme(data, preview)
    case 'pageTemplate':
      return pageTemplate(data, preview)
    case 'pageGrid':
      return pageGrid(data, preview)  
    default:
      return pageTemplate(data, preview)
  }
}

export default function Index ({ data = {}, preview = false }) {

  if(Object.keys(data).length === 0) return

  return pageSwitch(data, preview)
}


export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.language}__${params.slug}`

  let pageProgrammeData = await getClient(preview).fetch(pageProgrammeBySlugQuery, {
    slug: slug
  })
  
  let pageTemplateData = await getClient(preview).fetch(pageTemplateBySlugQuery, {
    slug: slug
  })

  let pageGridData = await getClient(preview).fetch(pageGridBySlugQuery, {
    slug: slug
  })

  let pageData = [pageProgrammeData, pageTemplateData, pageGridData]

  pageData = pageData.filter(item => item !== null)

  pageData = pageData[0]

  if(pageData === undefined) pageData = null

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
        pageData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(pageProgrammeAndPageTemplateAndPageGridSlugsQuery)

    return {
      // paths: paths.map(({language, slug}) => ({ params: { language, slug } })),
      // paths: paths.map(({language, slug}) => ({
      //   params: { language: language , slug: splitSubSlug(slug, 1)}
      // })),
      paths: paths.map(({language, slug}) => ({
        params: { language: language , slug: slug}
      })),
      fallback: true,
    }
  }