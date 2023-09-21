import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import styled from 'styled-components'

import Image from '../image'
import Video from '../video-embed'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: fixed;
    height: calc(100vh - 111px);
    width: 100%;
    background: var(--black);

    .flickity-page-dots {
        right: var(--margin);
        bottom: var(--margin);
        width: fit-content;
    }

    .flickity-page-dots .dot {
        border: 1px solid black;
        background: black;
        opacity: 1;
        width: 6px;
        height: 6px;
        margin: 0 3px;
    }

    .flickity-page-dots .dot.is-selected {
        border: 1px solid black;
        background: white;
    }
`

const Carousel = styled.div`
    outline: none !important;
    height: 100%;
    width: 100%;
`

const Slide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    > .image-wrapper {
        height: 70%;
        width: auto;
    }

    > div > img
     {
        width: auto !important;
        height: 100% !important;
    }

    .caption {
        color: white;
    }
`


export default function Component ({ data }) {
    let flickity = null;
    let gallery = useRef();
    let players = useRef(null);

    let init = () => {
        if(flickity !== null) return

        flickity = new Flickity(gallery.current, {
            prevNextButtons: false,
            pageDots: true,
            selectedAttraction: 0.07,
            friction: 0.42,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            // adaptiveHeight: true
            setGallerySize: false
        })

        flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
            if(event.target.tagName === 'BUTTON') {
                return
            }

            players.current?.forEach(item => {item.pause()})

            if(event.clientX < window.innerWidth / 2) {
                flickity.previous()
            } else {
                flickity.next()
            }
        })

        // flickity.on('change', (cellIndex) => {
        //     setSelectedIndex(cellIndex)
        // })
    }

    let resize = () => {
        players.current?.forEach(item => {
            // Resize players.current

            let height = item.elements.container.getBoundingClientRect().height
            let width = item.elements.container.getBoundingClientRect().width

            let aspectRatio = width / height 

            item.elements.container.parentNode.style.width = `${aspectRatio * 0.7 * window.innerHeight}px`
        })
    }

    useEffect(() => {
        init();

        setTimeout(() => {
            players.current = Plyr.setup('.player', {clickToPlay: false, controls: ['play', 'progress', 'mute', 'fullscreen'], fullscreen: {iosNative: true}});

            players.current?.forEach(item => {
                // Remove double click for fullscreen
                item.eventListeners.forEach(function(eventListener) {
                    if(eventListener.type === 'dblclick') {
                        eventListener.element.removeEventListener(eventListener.type, eventListener.callback, eventListener.options);
                    }
                });
            })
        }, 300)

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }

    }, []);

    return (
        <Container>
            <Carousel ref={gallery} aria-live="polite" aria-label="carousel">
                {
                    data?.map((item, index) => 
                            <Slide
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${data.length}`}
                                // aria-current={selectedIndex === index ? true : false}
                            >
                                {item._type === 'captionImage' ?
                                    <Image data={item} />
                                    :
                                    <Video data={item} hasResize={true} />
                                }
                            </Slide>
                        )
                }
            </Carousel>
        </Container>
    )
}

