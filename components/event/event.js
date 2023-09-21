import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'
import Plyr from 'plyr'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Hero from './hero'
import Slices from '../slices/index'
import Slides from './slides'
import Link from '../link'
import Button from '../button'

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

    @media(max-width: 989px) {
        padding-bottom: 0 !important;
    }
`

const ColRight = styled.div`
    @media(max-width: 989px) {
        padding-top: 0;
    }
`

const BackButton = styled.div`
    position: fixed;
    bottom: calc(var(--margin) * 2);
    left: calc(var(--margin) * 2);

    > a:hover > button {
        color: var(--black) !important;
    }
`

const CalendarButtons = styled.div`
    margin-top: calc(-1 * var(--margin));

    > a  {
        margin:  var(--margin) calc(var(--margin) * 6) var(--margin) 0;
        width fit-content;
    }

    > a:hover > button {
        color: var(--black) !important;
    }

    @media(max-width: 989px) {
        display: flex;
        flex-direction: column;

        > a {
            margin: 0 0 var(--margin) 0;
        }
    }
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

        players.current?.forEach(item => {
            // Remove double click for fullscreen
            item.eventListeners.forEach(function(eventListener) {
                if(eventListener.type === 'dblclick') {
                    eventListener.element.removeEventListener(eventListener.type, eventListener.callback, eventListener.options);
                }
            });
        })
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
                        <CalendarButtons>
                            {
                                data.googleCalLink && <a href={data.googleCalLink} target='_blank' rel='noopener noreferrer nofollow'><Button>Ajouter à Google agenda</Button></a>
                            }
                            {
                                data.iCalURL && <a href={`${data.iCalURL}?dl=`} rel='noopener noreferrer nofollow'><Button>Exporter vers I cal</Button></a>
                            }
                        </CalendarButtons>
                    </ColRight>
                </Container>
                <BackButton>
                    <Link href={`/${router.query.language}/agenda`}><Button>{router.query.language === 'fr' ? 'Retour agenda' : 'Back to calendar'}</Button></Link>
                </BackButton>
            </Layout>
        </>
    )
}

