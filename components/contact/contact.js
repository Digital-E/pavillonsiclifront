import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'
import Plyr from 'plyr'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Body from '../body'
import EmailSubscribe from '../email-subscribe'

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - var(--menu-height));

    > div {
        flex-basis: 50%;
    }

    .email-subscribe-title {
        margin-bottom: var(--margin);
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            flex-basis: 100%;
        }
    }
`

const ColLeft = styled.div`
    position: relative;

    > div {
        height: 100%;
    }

    iframe {
        width: 100%;
        height: calc(100% - 1px);
    }

    @media(max-width: 989px) {
        padding: var(--margin);
        
        iframe {
            width: 100%;
            height: 350px;
        }  
    }
`

const ColRight = styled.div`
    padding: 0 var(--margin);

    @media(max-width: 989px) {
        > div:nth-child(1) {
            border-top: 1px solid var(--black);
        }
    }
`

const Text = styled.div`
    padding-top: var(--margin);
    border-bottom: 1px solid var(--black);
`

const EmailSubscribeWrapper = styled.div`
    margin: var(--margin) 0 calc(var(--margin) * 2) 0;
`



export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()
    let players = useRef(null);

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }

    useEffect(() => {
        players.current = Plyr.setup('.player', {clickToPlay: false, controls: ['play', 'progress', 'mute', 'fullscreen'], fullscreen: {iosNative: true}});
    }, [])

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <ColLeft>
                        <div dangerouslySetInnerHTML={{__html: data.googleMapsEmbed}}/>
                    </ColLeft>
                    <ColRight>
                        <Text>
                            <Body content={data?.textOne} />
                        </Text>
                        <Text>
                            <Body content={data?.textTwo} />
                        </Text>
                        <EmailSubscribeWrapper>
                            <EmailSubscribe data={footerData} />
                        </EmailSubscribeWrapper>
                    </ColRight>
                </Container>
            </Layout>
        </>
    )
}

