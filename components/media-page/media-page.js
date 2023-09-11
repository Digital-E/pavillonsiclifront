import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Slides from './slides'
import Link from '../link'

const Container = styled.div``

const BackButton = styled.div`
    position: absolute;
    top: calc(var(--margin) * 2);
    right: calc(var(--margin) * 2);
    z-index: 999;

    svg {
        fill: white;
        width: 25px;
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
                    <BackButton>
                        <Link href={`/${router.query.language}/media/${router.query.slug}`}>
                            <svg x="0px" y="0px" viewBox="0 0 490 490" xmlSpace="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path d="M5,490c-1.3,0-2.6-0.5-3.5-1.5c-2-2-2-5.1,0-7.1l480-480c2-2,5.1-2,7.1,0c2,2,2,5.1,0,7.1l-480,480
                                            C7.6,489.5,6.3,490,5,490z"/>
                                    </g>
                                    <g>
                                        <path d="M485,490c-1.3,0-2.6-0.5-3.5-1.5L1.5,8.5c-2-2-2-5.1,0-7.1s5.1-2,7.1,0l480,480c2,2,2,5.1,0,7.1
                                            C487.6,489.5,486.3,490,485,490z"/>
                                    </g>
                                    <g>
                                        <path d="M485,490H5c-2.8,0-5-2.2-5-5V5c0-2.8,2.2-5,5-5h480c2.8,0,5,2.2,5,5v480C490,487.8,487.8,490,485,490z M10,480h470V10H10
                                            V480z"/>
                                    </g>
                                </g>
                            </g>
                            </svg>                            
                        </Link>
                    </BackButton>                    
                    <Slides data={data?.slides} />
                </Container>
            </Layout>
        </>
    )
}

