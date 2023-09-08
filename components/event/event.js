import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

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
        top: 122px;
    }
`

const ColRight = styled.div``

const BackButton = styled.div`
    position: fixed;
    bottom: calc(var(--margin) * 2);
    left: calc(var(--margin) * 2);

    > a:hover > button {
        color: var(--black) !important;
    }
`

const CalendarButtons = styled.div`
    margin: calc(var(--margin) * 1) 0;

    > a  {
        margin-right: calc(var(--margin) * 6);
        width fit-content;
    }

    > a:hover > button {
        color: var(--black) !important;
    }
`



export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    useEffect(() => {
        Plyr.setup('.player', {controls: ['play', 'progress', 'mute', 'fullscreen'], fullscreen: {iosNative: true}});
    }, [])

    return (
        <>
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <ColLeft>
                        <Slides data={data?.slides} />
                    </ColLeft>
                    <ColRight>
                        <Hero data={data} />
                        <Slices data={data?.slices} />
                        <CalendarButtons>
                            <a href={data.googleCalLink} target='_blank' rel='noopener noreferrer nofollow'><Button>Ajouter à Google agenda</Button></a>
                            <a href={`${data.iCalURL}?dl=`} rel='noopener noreferrer nofollow'><Button>Exporter vers I cal</Button></a>
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

