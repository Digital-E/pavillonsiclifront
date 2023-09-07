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
    position: fixed;
    bottom: calc(var(--margin) * 2);
    left: calc(var(--margin) * 2);

    > a:hover > button {
        color: var(--black) !important;
    }
`



export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <>
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Slides data={data?.slides} />
                </Container>
                <BackButton>
                    {/* <Link href={`/${router.query.language}/agenda`}><Button>{router.query.language === 'fr' ? 'Retour agenda' : 'Back to calendar'}</Button></Link> */}
                </BackButton>
            </Layout>
        </>
    )
}

