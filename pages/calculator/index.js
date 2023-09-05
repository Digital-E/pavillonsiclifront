import { useContext, useEffect } from 'react'
import { store } from '../../store'
import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'

import { calculatorQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import Calculator from '../../components/calculator/calculator'
const PreviewCalculator = lazy(() => import("../../components/calculator/preview-calculator"));

export default function Component ({ data = {}, preview = false }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;


  useEffect(() => {
    setTimeout(() => {
      if(sessionStorage.getItem('hasSetCalculatorData') === 'true' && !preview) return

      //  Remap Questions

      let remapQuestions = data.data.questions.map((item, index) => {
        let obj = item;

        obj.index = index;
        obj.hasAnswered = false;
        obj.isOpen = false;
        obj.selectedIndex = null;

        return obj;
      })

      dispatch({ type: 'update questions', value: remapQuestions})

      sessionStorage.setItem('hasSetCalculatorData', 'true')
    }, 0)
  }, [])
  

  return preview ? 
  (
    <PreviewSuspense fallback="Loading...">
      <PreviewCalculator data={data.data} query={calculatorQuery} footerData={data.footerData}/>    
    </PreviewSuspense>
  )
  :
  (
    <Calculator data={data.data} footerData={data.footerData}/>
  )
}


export async function getStaticProps({ preview = false, params }) {

  const data = await getClient(preview).fetch(calculatorQuery)

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

