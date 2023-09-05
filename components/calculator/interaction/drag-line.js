import { useEffect, useState, useRef, useContext } from 'react'
import { store } from '../../../store'

import styled from 'styled-components'
import { motion, animate } from 'framer-motion'

import { sanityConfig } from '../../../lib/config'
import { getFileAsset } from '@sanity/asset-utils'
import ThreeJSObject from '../three-js-object'

import Button from '../../button'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    margin-top: 0;

    @media(max-width: 989px) {
        padding: 0;

        .body-small {
            font-size: 0.75rem;
        }
    }
`

const PlaceholderBox = styled.div`
    height: 50px;
    width: 50px;
    background: red;
`

const Drag = styled(motion.div)`
    cursor: pointer;
    width: 200px;
    height: 200px;
    
    // img {
    //   cursor: pointer;
    //   pointer-events: none;
    //   width: 100%;
    // }

    &.dragging {
      pointer-events: none;
    }
    

    @media(max-width: 989px) {
        width: 150px;
        height: 150px;
    }
`

const Row = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to right, white 10%, rgba(255, 255, 255, 0) 0%);
    background-position: center;
    background-size: 10px 1px;
    background-repeat: repeat-x;
    margin-top: -50px;
`

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    :first-child {
        justify-content: flex-start;
    }

    :last-child {
        justify-content: flex-end;
    }

    flex-basis: 33.3333%;
    text-transform: uppercase;

    p {
        margin: 50px 0 0 0;
    }
`

const Indication = styled.p`
    color: rgba(0,255,10,1);
`

const Information = styled.div`
    margin-top: 30px;
`

const Confirm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    circle {
        fill: rgba(0,255,10,1);
    }
`

const Picked = styled.div`
    display: flex;
    align-items: center;

    p {
        margin: 0;
        margin-left: 10px;
    }
`

const ButtonWrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
    margin-top: 30px;

    div {
        margin: 0;
    }
`


let transition = {type: "spring", stiffness: 300, duration: 0.3}

let transitionInit = {duration: 0}

let defaultTimeout = null

let mouseOverTimeout = null

export default function Component ({ data, index, hasSubmitted }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let containerRef = useRef();
    let rowRef = useRef();
    let dragElementRef = useRef();

    let mouseOverIndex = useRef(0);

    let initDragElementCoords = useRef({x: 0, y: 0});


    useEffect(() => {
        clearTimeout(defaultTimeout)

        setTimeout(() => {
            let coords = {
                x: dragElementRef.current.getBoundingClientRect().x,
                y: dragElementRef.current.getBoundingClientRect().y,
                width: dragElementRef.current.getBoundingClientRect().width,
                height: dragElementRef.current.getBoundingClientRect().height
            }
            
            initDragElementCoords.current = coords
        }, 20)

        if(state.questions[index].isOpen) {
            setTimeout(() => {
                defaultSelect(state.questions[index].selectedIndex)
            }, 30)
        } else {
            defaultTimeout = setTimeout(() => {
                defaultSelect(null)
            }, 300)
        }

    }, [state.questions[index].isOpen])

    let defaultSelect = (index) => {
        if(dragElementRef.current === null) return

        if(index === null) return animate(dragElementRef.current, {x: 0, y: 0}, transitionInit)

        if(index === 1) {
            animate(dragElementRef.current, {
                x: 0,
                y: getYPosition(rowRef.current.children[index])
            }, transitionInit)

            return
        }

        animate(dragElementRef.current, {
            x: getXPosition(rowRef.current.children[index]),
            y: getYPosition(rowRef.current.children[index])
        }, transitionInit)
    }

    let setStateIndex = (index, value) => {
        let items = JSON.parse(JSON.stringify(state.questions))

        items[index].selectedIndex = value

        dispatch({type: 'update questions', value: items})
    }

    let clicked = (e) => {

        animate(dragElementRef.current, { scale: 1.5 }, transition)
  
        setTimeout(() => {
            animate(dragElementRef.current, { scale: 1.1 }, transition)
        }, 50)
    }

    let onDragStart = () => {
        dragElementRef.current.classList.add("dragging")
    }

    let getXPosition = (square) => {
        let dragElX = initDragElementCoords.current.x 
        let dragElWidth = initDragElementCoords.current.width
        let squareX = square.getBoundingClientRect().x
        let squareWidth = square.getBoundingClientRect().width

        if(dragElX > squareX) {
            return - (dragElX - squareX + dragElWidth / 3)
        } else {
            return squareX - dragElX + squareWidth - dragElWidth / 1.5
        }
    }

    let getYPosition = (square) => {
        let dragElY = initDragElementCoords.current.y
        let dragElHeight = initDragElementCoords.current.height
        let squareY = square.getBoundingClientRect().y
        let squareHeight = square.getBoundingClientRect().height

        return (squareY - dragElY) + squareHeight / 2 - dragElHeight / 2
    }

    let toggleHasAnswered = () => {
        let items = JSON.parse(JSON.stringify(state.questions))

        items[index].selectedIndex = null
        items[index].hasAnswered = false

        dispatch({type: 'update questions', value: items})
    }
    

    let onDragEnd = () => {
        setTimeout(() => {

            dragElementRef.current.classList.remove("dragging")

            if(mouseOverIndex.current === 0) {
            setStateIndex(index, 0)
            animate(dragElementRef.current, {
                x: getXPosition(rowRef.current.children[mouseOverIndex.current]),
                y: getYPosition(rowRef.current.children[mouseOverIndex.current])
            }, transition)

                
            } else if (mouseOverIndex.current === 1) {
            setStateIndex(index, 1)
            animate(dragElementRef.current, {
                x: 0,
                y: getYPosition(rowRef.current.children[mouseOverIndex.current])
            }, transition)
            
            } else if (mouseOverIndex.current === 2) {
                setStateIndex(index, 2)
                animate(dragElementRef.current, {
                    x: getXPosition(rowRef.current.children[mouseOverIndex.current]),
                    y: getYPosition(rowRef.current.children[mouseOverIndex.current])
                }, transition)
            } else if(mouseOverIndex.current === null) {
                setStateIndex(index, null)
                animate(dragElementRef.current, {x: 0, y: 0}, transition)

                toggleHasAnswered()
        }
        }, 10)
    }  

    let toggleMouseOver = (index) => {
        clearTimeout(mouseOverTimeout)

        if(index === null) {
            mouseOverTimeout = setTimeout(() => {
                mouseOverIndex.current = index
            }, 30)
        } else {
            mouseOverIndex.current = index
        }
    }

    let mouseOverForce = (index) => {
        mouseOverIndex.current = index
        onDragEnd()
    }    
    
    let onClickToggle = (e) => {
        if(document.activeElement === e.currentTarget) {
            mouseOverForce(index) 
        }
    }


    return (
        <Container ref={containerRef}>
            <Drag
                aria-hidden='true'
                ref={dragElementRef}
                onClick={(e) => {clicked(e)}}
                onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{scale: 1.1 }}
                whileTap={{ scale: 1.5 }}
                onDragStart={() => onDragStart()}
                onDragEnd={() => onDragEnd()}
                drag
                dragSnapToOrigin={true}
                dragMomentum={false}
            >
                {/* <img src={data.objectImage.src} /> */}
                {/* <PlaceholderBox /> */}
                <ThreeJSObject triggerLoad={state.questions[index].isOpen} gltfObject={state.questions[index].gltfObject && getFileAsset(state.questions[index].gltfObject, sanityConfig).url} rotationX={state.questions[index].rotationX} positionY={state.questions[index].positionY} rotate={true} />
            </Drag>
            <Row ref={rowRef}>
                {
                    data.answers?.map((item, index) => 
                    <Box
                        onPointerEnter={() => toggleMouseOver(index)}
                        onPointerLeave={() => toggleMouseOver(null)}
                        onClick={(e) => onClickToggle(e)}
                        aria-label='select a box'
                        aria-checked={index === state.questions[index]?.selectedIndex ? 'true' : 'false'}
                    >
                        <p className='body-small'>{item.label}</p>
                    </Box>
                    )
                }
            </Row>
            <Information>
                {state.questions[index]?.selectedIndex === null ?
                    <Indication>{data.indication}</Indication>
                    :
                    <Confirm>
                        <Picked>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g filter="url(#filter0_b_554_10195)">
                        <circle cx="12" cy="12" r="12" fill="white" fill-opacity="0.4"/>
                        </g>
                        <path d="M8 12.9375L10.7391 16L17 9" stroke="white"/>
                        <defs>
                        <filter id="filter0_b_554_10195" x="-20" y="-20" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_554_10195"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_554_10195" result="shape"/>
                        </filter>
                        </defs>
                        </svg>  
                        <p>{`You picked ${data.answers[state.questions[index]?.selectedIndex].label}`}</p></Picked>
                        <ButtonWrapper onClick={() => hasSubmitted()}>
                            <Button>Submit</Button>
                        </ButtonWrapper>
                    </Confirm>
                }
            </Information>
        </Container>
    )
}

