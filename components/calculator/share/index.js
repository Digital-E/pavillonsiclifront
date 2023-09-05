import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { store } from '../../../store'

import styled from 'styled-components'

import { SITE_NAME } from '../../../lib/constants'

import Layout from '../../layout'

import Results from './results'

import Buttons from './buttons'

const Container = styled.div``


export default function Component ({ data = {}, footerData, preview = false }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;


    const router = useRouter()

    
    let submitCalculatorData = async (questions) => {
        let data = await fetch("/api/sheets", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: sessionStorage.getItem('art4BioUserEmail'), questions: questions}),
          }).then((response) => response.json());
    }

    useEffect(() => {

        if(sessionStorage.getItem('art4BioUserEmail') === null || sessionStorage.getItem('hasSubmittedAnswers') === 'true') return


        if(state.questionsInit.length > 0) {
            submitCalculatorData(state.questions)

            sessionStorage.setItem('hasSubmittedAnswers', 'true')
        }
    }, [state])


    return (
        <>
            <Layout preview={preview} title={`Share | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Results />
                    <Buttons />
                </Container>
            </Layout>
        </>
    )
}

