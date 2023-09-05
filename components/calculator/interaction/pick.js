import { useEffect, useRef, useContext } from 'react'
import { store } from '../../../store'

import styled from 'styled-components'
import { motion, animate } from 'framer-motion'

import { sanityConfig } from '../../../lib/config'
import { getFileAsset } from '@sanity/asset-utils'
import ThreeJSObject from '../three-js-object'

// import { useMediaQuery } from 'react-responsive'

import Button from '../../button'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    margin-top: 0px;

    @media(max-width: 989px) {
        padding: 0;

        .body-small {
            font-size: 0.75rem;
        }
    }
`

const Image = styled(motion.div)`
    width: 200px;
    height: 200px;

    @media(max-width: 989px) {
        width: 150px;
        height: 150px;
    }
`

const Row = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 0px;

    @media(max-width: 989px) {
        flex-wrap: wrap;
        margin-top: -20px;
        margin-left: -10px;
        margin-right: -10px;
    }
`

const Box = styled(motion.div)`
    position: relative;
    display: flex;
    height: 100px;
    width: 100px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    margin: 0 15px;
    cursor: pointer;
    user-select: none;

    text-transform: uppercase;

    p {
        margin: 0;
        text-align: center;
    }

    @media(max-width: 989px) {
        margin: 10px 10px;
        height: 80px;
        width: 80px;
        min-height: 80px;
        min-width: 80px;
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

const BoxBackground = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: rgba(255,255,255,0.1);
    border-radius: 999px;
    z-index: -1;
    transform: scale(0);
    opacity: 0;
    transition: transform 0.3s, opacity 0.1s;

    &.show {
        opacity: 1;
        transform: scale(1); 
    }
`



let transition = {type: "spring", stiffness: 300, duration: 0.3}

let transitionInit = {duration: 0}

export default function Component ({ data, index, hasSubmitted }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let containerRef = useRef();

    useEffect(() => {
        // setTimeout(() => {
        //     defaultSelect(state.questions[index].selectedIndex)
        // }, 0)
    }, [index])

    let defaultSelect = (index) => {

    }

    let setStateIndex = (index, value) => {
        let items = JSON.parse(JSON.stringify(state.questions))

        items[index].selectedIndex = value

        dispatch({type: 'update questions', value: items})
    }

    let clicked = (e, boxIndex) => {
        let el = e.currentTarget

        animate(el, { scale: 1.5 }, transition)

        setIndex(boxIndex)
  
        setTimeout(() => {
            animate(el, { scale: 1.1 }, transition)
        }, 50)
    }
    

    let setIndex = (boxIndex) => {
        setStateIndex(index, boxIndex)
    }  

    return (
        <Container ref={containerRef}>
            <Image>
                {/* <img src={data.objectImage.src} /> */}
                <ThreeJSObject triggerLoad={state.questions[index].isOpen} gltfObject={state.questions[index].gltfObject && getFileAsset(state.questions[index].gltfObject, sanityConfig).url} rotationX={state.questions[index].rotationX} positionY={state.questions[index].positionY} rotate={true}/>
            </Image>
            <Row>
                {
                    data.answers?.map((item, boxIndex) => 
                    <Box
                        onClick={(e) => {clicked(e, boxIndex)}}
                        aria-label='select a box'
                        aria-checked={index === state.questions[index]?.selectedIndex ? 'true' : 'false'}
                    >
                        <BoxBackground className={state.questions[index]?.selectedIndex === boxIndex ? 'show' : ''}/>
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

