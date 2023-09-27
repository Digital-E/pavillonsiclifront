import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'
import Plyr from 'plyr'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Hero from '../event/hero'
import Slices from '../slices/index'
import Slides from '../event/slides'
import Tiles from '../agenda/tiles'

const Container = styled.div`
    display: flex;

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

const ColLeft = styled.div`
    position: relative;

    > div {
        position: sticky;
        top: calc(var(--menu-height) + var(--margin));
    }
`

const ColRight = styled.div``

const TilesTitle = styled.div`
    text-align: center;
    border-top: 1px solid black;
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
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <ColLeft>
                        <Slides data={data?.slides} players={players} />
                    </ColLeft>
                    <ColRight>
                        <Hero data={data} />
                        <Slices data={data?.slices} />
                    </ColRight>
                </Container>
                <TilesTitle><h2>{data.gridTitle}</h2></TilesTitle>
                <Tiles data={data?.events} />
            </Layout>
        </>
    )
}

