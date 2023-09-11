import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Image from '../image'
import Video from '../video-embed'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    .flickity-page-dots {
        right: var(--margin);
        bottom: var(--margin);
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

        // flickity.on('change', (cellIndex) => {
        //     setSelectedIndex(cellIndex)
        // })

        flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
            if(event.target.tagName === 'BUTTON') {
                return
            }

            players.current?.forEach(item => {item.pause()})

            flickity.next()
        })

        if(data.length < 2) {
            gallery.current.classList.add('hide-nav')
            setIsInSlider(false)
            setTimeout(() => {
                flickity.resize()
            }, 0)
        }
    }

    useEffect(() => {
        init();
    }, []);

    console.log(isInSlider)

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

