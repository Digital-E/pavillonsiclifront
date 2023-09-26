import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Tiles from './tiles'

const Container = styled.div``

const Title = styled.h1`
    margin: 0;
    padding: calc(var(--margin) * 3) 0;
    text-align: center;
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
                <Title>{data.title}</Title>
                <Container>
                    <Tiles data={data?.tiles} />
                </Container>
            </Layout>
        </>
    )
}

