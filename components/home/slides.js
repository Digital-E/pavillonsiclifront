import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Image from '../image'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
`

const Carousel = styled.div`
    height: 100%;
    width: 100%;
    outline: none !important;

    .flickity-viewport {
    }
`

const Slide = styled.div`
    height: 100%;
    width: 100%;

    div, img {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
    }
`


export default function Component ({ data }) {
    let flickity = null;
    let gallery = useRef();

    let init = () => {
        if(flickity !== null) return

        flickity = new Flickity(gallery.current, {
            prevNextButtons: false,
            pageDots: false,
            selectedAttraction: 0.07,
            friction: 0.42,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            setGallerySize: false
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
                    data.map((item, index) => 
                            <Slide
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${data.length}`}
                                // aria-current={selectedIndex === index ? true : false}
                            >
                                <Image data={item} />
                            </Slide>
                        )
                }
            </Carousel>
        </Container>
    )
}

