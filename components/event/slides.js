import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Image from '../image'
import Video from '../video-embed'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: relative;

    .flickity-page-dots {
        right: var(--margin);
        bottom: calc(var(--margin) + 2px);
        width: fit-content;
    }

    .hide-nav .flickity-page-dots {
        display: none;
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

    @media(max-width: 989px) {
        .flickity-page-dots {
            bottom: 45px;
        }

        &.border-bottom-single::after {
            position: absolute;
            left: 0;
            bottom: calc(-1 * var(--margin));
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: var(--black);
        }

        &.border-bottom-multiple::after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: var(--black);
        }
    }
`

const Carousel = styled.div`
    outline: none !important;
`

const Slide = styled.div`
    width: 100%;
`


export default function Component ({ data, players }) {
    let flickity = null;
    let gallery = useRef();
    let [isInSlider, setIsInSlider] = useState(true)

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
            adaptiveHeight: true
            // setGallerySize: false
        })

        flickity.on('change', (cellIndex) => {
            players.current?.forEach(item => {item.pause()})
        })

        flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
            if(event.target.tagName === 'BUTTON') {
                return
            }

            if(event.clientX < window.innerWidth / 4) {
                flickity.previous()
            } else {
                flickity.next()
            }
        })

        if(data?.length < 2) {
            gallery.current.classList.add('hide-nav')
            setIsInSlider(false)
            setTimeout(() => {
                flickity.resize()
            }, 10)
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Container className={data?.length > 1 ? 'border-bottom-multiple' : 'border-bottom-single'}>
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
                                    <Image data={item} isInSlider={isInSlider} />
                                    :
                                    <Video data={item} isInSlider={isInSlider} />
                                }
                            </Slide>
                        )
                }
            </Carousel>
        </Container>
    )
}

