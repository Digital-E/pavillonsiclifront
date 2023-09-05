import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Hero from './hero'
import AnchorMenu from '../slices/anchor-menu'
import Slices from '../slices/index'

const Container = styled.div``


export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Hero data={data} />
                    <AnchorMenu data={data} />
                    <Slices data={data?.slices} />
                </Container>
            </Layout>
        </>
    )
}

