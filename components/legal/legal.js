import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Body from '../body'

const Container = styled.div`
    margin: 0 var(--margin);
    min-height: calc(100vh - var(--menu-height));
`

const Title = styled.h2`
    padding: var(--margin) 0;
`


const Text = styled.div`
    margin: var(--margin) 0;

    p {
        font-size: inherit;
    }
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
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                <Title className='body-large'>{data?.title}</Title>
                <Text className='body-large'>
                    <Body content={data.text} />
                </Text>
                </Container>
            </Layout>
        </>
    )
}

