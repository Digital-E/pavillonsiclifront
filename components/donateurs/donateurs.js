import { useRef } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Body from '../body'
import Link from '../link'
import Image from '../image'

const Container = styled.div`
`

const RowOne = styled.div`
    display: flex;
    border-bottom: 1px solid var(--black);

    > div {
        padding: var(--margin);
    }

    > div:nth-child(1) {
        flex-basis: 40%;
    }

    > div:nth-child(2) {
        flex-basis: 60%;
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            flex-basis: 100%;
        }
    }
`


const ColLeft = styled.div`
`

const ColRight = styled.div`
    margin: calc(var(--margin)*2) 0 calc(var(--margin)*10) 0;
    column-count: 2;

    * {
        margin: 0;
        font-size: inherit;
    }

    @media(max-width: 989px) {
        column-count: 1;
    }
`

const RowTwo = styled.div`
    display: flex;  
    flex-direction: row;
    flex-wrap: wrap;
    margin: calc(var(--margin)*6) 0;
    
    
    > a {
        flex-basis: 25%;
    }

    @media(max-width: 989px) {
        > a {
            flex-basis: 100%;
        }  
    }
`

const ImageWrapper = styled.div`
  height: 70px;
  margin: calc(var(--margin)*6) 0;
  

  > div {
    height: 100%;
  }

  > div > img {
    height: 100% !important;
    width: auto !important;
  }
`


export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }
    
    return (
        <>
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <RowOne>
                        <ColLeft>
                            <h1>{data.referenceTitle}</h1>
                        </ColLeft>
                        <ColRight className='h3'>
                            <Body content={data?.textOne} />
                        </ColRight>
                    </RowOne>
                    <RowTwo>
                        {data?.logos?.map(item => <Link href={item.linkURL}><ImageWrapper><Image data={item.image}/></ImageWrapper></Link>)}
                    </RowTwo>
                </Container>
            </Layout>
        </>
    )
}

