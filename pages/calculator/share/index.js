import { useEffect, useContext } from 'react'
import { store } from '../../../store'


import { calculatorQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient } from '../../../lib/sanity.server'

import Share from '../../../components/calculator/share'

export default function Component ({ data = {}, preview = false }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;  

  useEffect(() => {

    //  Remap Questions

    let remapQuestions = data.data.questions.map((item, index) => {
      let obj = item;

      obj.index = index;

      return obj;
    })

    dispatch({ type: 'update questions init', value: remapQuestions})

    // Add sentences to store

    let sentences = [data.data.sentenceOne, data.data.sentenceTwo, data.data.sentenceThree, data.data.sentenceFour]

    dispatch({ type: 'update sentences', value: sentences})

  }, [])  

  return <Share  />
  // return preview ? 
  // (
  //   <PreviewSuspense fallback="Loading...">
  //     <PreviewCalculator data={data.data} query={calculatorQuery} footerData={data.footerData}/>    
  //   </PreviewSuspense>
  // )
  // :
  // (
  //   <Calculator data={data.data} footerData={data.footerData}/>
  // )
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

