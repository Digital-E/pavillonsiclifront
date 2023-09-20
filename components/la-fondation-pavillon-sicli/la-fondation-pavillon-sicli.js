import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'
import Plyr from 'plyr'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Hero from './hero'
import Slides from '../event/slides'
import Body from '../body'

const Container = styled.div``

const RowOne = styled.div`
    display: flex;
    border-bottom: 1px solid black;

    > div {
        flex-basis: 50%;
        padding: var(--margin);
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            flex-basis: 100%;
        }
    }
`

const RowTwo = styled.div`
    display: flex;
    padding: var(--margin);

    > div {
        flex-basis: 33.3333%;
    }

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const ColLeft = styled.div``

const ColRight = styled.div``



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
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <RowOne>
                        <ColLeft>
                            <Slides data={data?.slides} players={players} />
                        </ColLeft>
                        <ColRight>
                            <Hero data={data} />
                        </ColRight>
                    </RowOne>
                    <RowTwo>
                        <ColLeft>
                            <Body content={data.textTwo} />
                        </ColLeft>
                        <ColRight>
                            <Body content={data.textThree} />
                        </ColRight>
                    </RowTwo>
                </Container>
            </Layout>
        </>
    )
}

