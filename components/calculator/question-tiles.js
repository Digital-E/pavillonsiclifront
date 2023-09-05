import { useEffect, useRef, useState, useContext } from 'react'
import { store } from '../../store'

import { motion, animate } from 'framer-motion'

import styled from 'styled-components'

import QuestionTile from './question-tile'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 30px);
    height: calc(100% - 30px);

    @media(max-width: 989px) {
        width: 100%;
        height: 100%;
    }
`

const Carousel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none !important;
    overflow: hidden;

    .flickity-viewport {
        width: 100%;
        overflow: visible;
    }
`

const Card = styled(motion.div)`
    position: absolute;
    pointer-events: none;

    > div {
        transition: opacity 1s;
    }

    &.blur-question-tile > div {
        opacity: 0.2 !important;
        transition: opacity 1s;
      }

    @media(max-width: 989px) {
        pointer-events: all;
        margin 0 25px;
        left: 0 !important;
        top: 0 !important;
    }
`

let hasPositioned = false
let desktopResizeCount = -1

export default function Component ({ data }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [show, setShow] = useState(false)

    let containerRef = useRef()
    let carouselRef = useRef();
    let flickity = null;
    let [cellIndex, setCellIndex] = useState(0)
    let [tileInViewIndex, setTileInViewIndex] = useState(0)
    let [flickityStaticClick, setFlickityStaticClick] = useState(0)
    let [hasClicked, setHasClicked] = useState(0)

    let init = () => {
        if(flickity !== null) return

        flickity = new Flickity(carouselRef.current, {
            prevNextButtons: false,
            pageDots: false,
            selectedAttraction: 0.07,
            friction: 0.42,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
        })

        flickity.on('change', function(index) {
            setTileInViewIndex(index)
        })

        flickity.on('staticClick', (event, pointer, cellElement, cellIndex ) => {
            setFlickityStaticClick(flickityStaticClick += 1)
            setCellIndex(cellIndex)
        })
    }

    useEffect(() => {
        if(flickityStaticClick > 0) {
            openQuestion(cellIndex)
        }
    }, [flickityStaticClick])

    let openQuestion = (index) => {
        
        let copyQuestions = JSON.parse(JSON.stringify(state.questions))

        if(!copyQuestions[index]) return

        copyQuestions[index].isOpen = true

        dispatch({type: 'update questions', value: copyQuestions})
    }

    let destroy = () => {
        if(flickity === null) return
        flickity.destroy()
        flickity = null
    }

    let positionCards = () => {
        if(hasPositioned || desktopResizeCount > 0) return
        // Randomly position cards

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        Array.from(carouselRef.current.children).forEach(item => {
            let randomX = clamp(Math.random() * window.innerWidth, 0, window.innerWidth - item.getBoundingClientRect().width - 20)
            let randomY = clamp(Math.random() * window.innerHeight, 0, window.innerHeight - item.getBoundingClientRect().height - 20)
            item.style.left = `${randomX}px`
            item.style.top = `${randomY}px`
        })     
        
        hasPositioned = true
    }

    useEffect(() => {

        // Carousel

        if(window.innerWidth < 990) {
            init();
        } else {
            desktopResizeCount = 0
            positionCards();
        }

        window.addEventListener("resize", () => {
            if(window.innerWidth > 989) {
                destroy();
                desktopResizeCount += 1
                hasPositioned = false;
                positionCards();
            } else {
                desktopResizeCount = -1
                init();
            }
        })

        return () => {
            hasPositioned = false
        }

    }, [])
    
    let variants = {
        'show': {
            opacity: 1,
        },
        'hide': {
            opacity: 0
        }
    }

    useEffect(() => {
    //   setTimeout(() => {
    //     setShow(true)
    //   }, 2000)
    }, [])   


    return (
        <Container 
            ref={containerRef}
        >
            <Carousel ref={carouselRef}
                        // initial={'hide'}
                        // variants={variants}
                        // animate={show ? 'show' : 'hide'}
            >
                {
                    data.map((item, index) => <Card className='question-card'><QuestionTile index={index} data={item} constraintsRef={containerRef} hasClicked={hasClicked} tileInViewIndex={tileInViewIndex} openQuestion={(index) => openQuestion(index)} /></Card>)
                }
            </Carousel>
        </Container>
    )
}

