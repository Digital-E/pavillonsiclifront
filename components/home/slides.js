import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Image from '../image'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    z-index: -1;

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

    .flickity-viewport {
    }
`

const Slide = styled.div`
    display: flex;
    // height: 100vh;
    width: 100vw;

    div, img {
        // height: 100% !important;
        // width: 100% !important;
        // object-fit: cover;
    }

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const ColLeft = styled.div`
    flex-basis: 50%;
    padding: var(--margin);
`

const ColRight = styled.div`
    flex-basis: 50%;

    @media(max-width: 989px) {
        padding: 0 var(--margin) var(--margin) var(--margin);
    }
`


const Text = styled.h1``


export default function Component ({ data }) {
    let flickity = null;
    let gallery = useRef();

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
            // setGallerySize: false
        })

        // flickity.on('change', (cellIndex) => {
        //     setSelectedIndex(cellIndex)
        // })
    }

    useEffect(() => {
        init();
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
                                <ColLeft>
                                    <Image data={item.image} />
                                </ColLeft>
                                <ColRight>
                                    <Text>{item.text}</Text>
                                </ColRight>
                            </Slide>
                        )
                }
            </Carousel>
        </Container>
    )
}

