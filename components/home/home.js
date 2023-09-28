import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Slides from './slides'
import Tiles from './tiles'

import IntroOverlay from '../intro-overlay'

const Container = styled.div`
    opacity: 0;
    transition: opacity 0.3s;
`


export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }

    return (
        <>
            <Layout preview={preview} title={`${data.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <IntroOverlay data={data?.introImages}/>
                <Container className='home-container'>
                    <Slides data={data?.slides} />
                    <Tiles data={data?.tiles} />
                </Container>
            </Layout>
        </>
    )
}

