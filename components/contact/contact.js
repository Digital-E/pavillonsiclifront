import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

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
        height: 100%;
    }
`

const ColRight = styled.div`
    padding: 0 var(--margin);
`

const Text = styled.div`
    padding-top: var(--margin);
    border-bottom: 1px solid var(--black);
`

const EmailSubscribeWrapper = styled.div`
    margin-top: var(--margin);
`



export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()
    let players = useRef(null);

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    useEffect(() => {
        players.current = Plyr.setup('.player', {clickToPlay: false, controls: ['play', 'progress', 'mute', 'fullscreen'], fullscreen: {iosNative: true}});
    }, [])

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <ColLeft>
                        <div dangerouslySetInnerHTML={{__html:
                            `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.079487969125!2d6.12733297703219!3d46.188976871095285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b2f7db5385d%3A0x9a37374fe2f3385e!2sPavillon%20Sicli!5e0!3m2!1sen!2sfr!4v1695029213781!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
                        }}/>
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

