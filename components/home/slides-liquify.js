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

    canvas {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.15);
    }
`

const Carousel = styled.div`
    height: 100%;
    width: 100%;
    outline: none !important;
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

let currentIndex = 0

let sliderInterval = null

export default function Component ({ data }) {
    let gallery = useRef();

    let init = () => {
        // images setup
        // window.images = data.map(item => item.asset)
        window.images = [
            "https://images.unsplash.com/photo-1523643391907-41e69459a06f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
            "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
            "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        ];

        // content setup
        const texts = [
            ["Earth", "Surface gravity‎: ‎9.807 m/s²"],
            ["Mars", "Surface gravity‎: ‎3.711 m/s²"],
            ["Venus", "Surface gravity‎: ‎8.87 m/s²"],
        ]    

        let images = []

        data?.forEach(item => {
            images.push(item.asset)
        })
        
        
        new rgbKineticSlider({

            slideImages: images, // array of images > must be 1920 x 1080
            itemsTitles: texts, // array of titles / subtitles

            backgroundDisplacementSprite: '/images/displacement/4.png', // slide displacement image 
            cursorDisplacementSprite: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80', // cursor displacement image

            cursorImgEffect : false, // enable cursor effect
            cursorTextEffect : false, // enable cursor text effect
            cursorScaleIntensity : 0.65, // cursor effect intensity
            cursorMomentum : 0.14, // lower is slower

            swipe: false, // enable swipe
            swipeDistance : window.innerWidth * 0.001, // swipe distance - ex : 580
            swipeScaleIntensity: 2, // scale intensity during swipping

            slideTransitionDuration : 2, // transition duration
            transitionScaleIntensity : 12, // scale intensity during transition
            transitionScaleAmplitude : 130, // scale amplitude during transition
            // transitionSpriteRotation: 5,

            nav: true, // enable navigation
            navElement: '.main-nav', // set nav class
        });
    }

    useEffect(() => {
    
        // setTimeout(() => {
            init()
        // }, 1000)

        sliderInterval = setInterval(() => {
            if(currentIndex < images.length - 1) {
                window.slideTransition(currentIndex + 1)
                currentIndex += 1
            } else {
                window.slideTransition(0)
                currentIndex = 0
            }
        }, 7000)


        return () => {
            currentIndex = 0
            clearInterval(sliderInterval)
        }

    }, []);

    return (
        <Container>
            <Carousel ref={gallery}>
                {/* {
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
                } */}
            <div id="rgbKineticSlider" class="rgbKineticSlider"></div>
            </Carousel>
        </Container>
    )
}

