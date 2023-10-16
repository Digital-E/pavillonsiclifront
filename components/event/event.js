import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'
import Plyr from 'plyr'

import splitSlug from '../../lib/splitSlug'

import { google } from "calendar-link";
// https://anandchowdhary.github.io/calendar-link/
import * as ics from 'ics'
// https://github.com/adamgibbons/ics

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

    @media(min-width: 990px) {
        > div:nth-child(2) {
            padding-left: 0;
        }
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
        display: none;
    }
`

const ColRight = styled.div`
    margin-bottom: ${props => props.marginBottom ? '-50px' : '0px'};

    @media(max-width: 989px) {
        padding-top: 0 !important;
        margin-bottom: 0;
    }
`

const BackButton = styled.div`
    position: sticky;
    bottom: calc(var(--margin) * 2);
    left: calc(var(--margin) * 2);
    margin-left: calc(var(--margin) * 2);
    margin-bottom: calc(var(--margin) * 2);
    z-index: 0;

    > a:hover > button {
        color: var(--black) !important;
    }

    @media(max-width: 989px) {
        position: fixed;
        bottom: calc(var(--margin) * 6);
        right: calc(var(--margin) * 1);
        left: auto;
        margin: 0px;
    }
`

const CalendarButtons = styled.div`
    margin-top: calc(-1 * var(--margin));

    &&.hide-calendar-buttons {
        display: none;
    }

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

const SlicesWrapper = styled.div`
    margin: var(--margin) 0 0 0;
`

const MobileSlides = styled.div`
    @media(min-width: 990px) {
        display: none;
    }
`




export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()
    let players = useRef(null);
    let [eventHasFinished, setEventHasFinished] = useState(false)

    let [googleCalUrl, setGoogleCalUrl] = useState(null)

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }

    useEffect(() => {
        // 'play-large'
        players.current = Plyr.setup('.player', {clickToPlay: false, quality: {default: 1080}, controls: ['play', 'progress', 'mute', 'fullscreen'], fullscreen: {iosNative: true}});

        players.current?.forEach(item => {
            // Remove double click for fullscreen
            item.eventListeners.forEach(function(eventListener) {
                if(eventListener.type === 'dblclick') {
                    eventListener.element.removeEventListener(eventListener.type, eventListener.callback, eventListener.options);
                }
            });
        })

        // Create calendar events:
        const event = {
            title: data.referenceTitle,
            description: data.description,
            start: data.dateAndTime,
            end: data.endDateAndTime,
            url: `http://www.pavillonsicli.ch/${splitSlug(data.slug)}`,
            duration: [1, "hour"]
        };

        let googleCalUrlVar = google(event);


        setGoogleCalUrl(googleCalUrlVar);


    }, [])



    const downloadFile = () => {
        let startDate = new Date(data.dateAndTime)
        let endDate = new Date(data.endDateAndTime)

        let startYear = startDate.getFullYear()
        let startMonth = startDate.getMonth() + 1
        let startDay = startDate.getDate()
        let startHours = startDate.getHours()
        let startMinutes = startDate.getMinutes()

        let endYear = endDate.getFullYear()
        let endMonth = endDate.getMonth() + 1
        let endDay = endDate.getDate()
        let endHours = endDate.getHours()
        let endMinutes = endDate.getMinutes()

        const event = {
        start: [startYear, startMonth, startDay, startHours, startMinutes],
        end: [endYear, endMonth, endDay, endHours, endMinutes],
        // duration: { hours: 1, minutes: 0 },
        title: data.referenceTitle,
        description: data.description,
        // location: 'Folsom Field, University of Colorado (finish line)',
        url: `http://www.pavillonsicli.ch/${splitSlug(data.slug)}`,
        status: 'CONFIRMED',
        }  

        ics.createEvent(event, (error, value) => {
        if (error) {
            console.log(error)
            return
        }

        const link = document.createElement("a");
        const file = new Blob([value], { type: 'text/calendar' });
        link.href = URL.createObjectURL(file);
        link.download = `${data.referenceTitle}.ics`;
        link.click();
        URL.revokeObjectURL(link.href);

        })        
    }

    useEffect(() => {
        let today = new Date();
        let endDate = new Date(data?.endDateAndTime);

        if(endDate - today < 0) {
            setEventHasFinished(true)
        }
    }, [])



    return (
        <>
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <ColLeft>
                        <Slides data={data?.slides} players={players} />
                    </ColLeft>
                    <ColRight marginBottom={data.backLink}>
                        <Hero data={data} />
                        <MobileSlides>
                            <Slides data={data?.slides} players={players} />
                        </MobileSlides>
                        <SlicesWrapper>
                            <Slices data={data?.slices} />
                        </SlicesWrapper>
                        <CalendarButtons className={eventHasFinished && 'hide-calendar-buttons'}>
                            <a href={googleCalUrl} target='_blank' rel='noopener noreferrer nofollow'><Button>{router.query.language === 'fr' ? 'Ajouter à Google agenda' : 'Add to Google Calendar'}</Button></a>
                            <a onClick={() => downloadFile()}  rel='noopener noreferrer nofollow'><Button>{router.query.language === 'fr' ? 'Exporter vers I cal' : 'Export to I cal'}</Button></a>
                        </CalendarButtons>
                    </ColRight>
                </Container>
                <BackButton>
                    {
                        data.backLink && <Link href={data.backLink}><Button>{router.query.language === 'fr' ? 'Retour agenda' : 'Back to calendar'}</Button></Link>
                    }
                </BackButton>
            </Layout>
        </>
    )
}

