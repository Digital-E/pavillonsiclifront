import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Slides from './slides'
import Tiles from './tiles'

const Container = styled.div``


export default function Component ({ data = {}, preview = false }) {
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
            <Layout preview={preview} title={`${data.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage}>
                <Container>
                    <Slides data={data?.slides} />
                    <Tiles data={data?.tiles} />
                </Container>
            </Layout>
        </>
    )
}

