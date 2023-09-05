import { useEffect, useRef, useContext, useState } from 'react'
import { store } from '../../store'

import styled from 'styled-components'
import { motion, animate } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import { sanityConfig } from '../../lib/config'
import { getFileAsset } from '@sanity/asset-utils'

import Image from '../image';

import ThreeJSObject from './three-js-object'

const Container = styled(motion.div)`
    height: 280px;
    width: 215px;
    backdrop-filter: blur(20px);
    padding: 15px 20px;
    box-sizing: border-box;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    pointer-events: all;
    opacity: 0;

    &.question-tile-container-reveal {
      opacity: 1;
      transition: opacity 1s;
    }

    // :active {
    //     cursor: grabbing; 
    // }

    @media(max-width: 989px) {
      transform: none !important;
    }
`

const Title = styled.a`
    position: relative;
    width: fit-content;
    z-index: 2;
    text-transform: uppercase;
`

const Object = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index:0
`

const Background = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    z-index: 1;

    div, img {
        position: absolute;
        width: 100%;
        height: 100% !important;
        object-fit: cover;
    }
`
let transition = {type: "spring", stiffness: 300, duration: 0.3}

let dragging = false

export default function Component ({ index, data, constraintsRef, openQuestion, tileInViewIndex}) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [backgroundImage, setBackgroundImage] = useState(null)
    let [hover, setHover] = useState(false)

    let containerRef = useRef()

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    }) 
    

    let clicked = (index) => {
        if(!dragging && window.innerWidth > 990) {
            openQuestion(index)
        }

        animate(containerRef.current, {scale: 1.1}, transition)

        setTimeout(() => {
            animate(containerRef.current, {scale: 1.05}, transition)
        }, 50)
    }

    let backgroundVariants = {
        initial: {
          opacity: 0
        },
        show: {
          opacity: 1,
          transition: {
            duration: 1
          }
        },
        hide: {
          opacity: 0,
          filter: "blur(20px)",
          transition: {
            opacity: {
              duration: 0.5
            },
            filter: {
              duration: 0.5,
            }
          }
        }
      }

      let variants = {
        'show': {
            opacity: 1,
            // transition: {
            //   duration: isDesktop ? 1 : 0,
            //   delay: 0
            // }
        },
        'hide': {
            opacity: 0
        }
      }

      useEffect(() => {
        if(state.questions[index]?.selectedIndex !== null) {
          setBackgroundImage(state.questions[index]?.answers[state.questions[index].selectedIndex].image)
        }
      }, [state])

      useEffect(() => {
        if(window.innerWidth > 989) return
        
        if(tileInViewIndex === index) {
          setHover(true)
        } else {
          setHover(false)
        }
      }, [tileInViewIndex])

      let setHoverDesktop = (bool) => {
        if(window.innerWidth < 990) return

        if(bool) {
          setHover(true)
        } else {
          setHover(false)
        }
      }

    return (
        <Container
            className='question-tile-container'
            ref={containerRef}
            drag={isDesktop ? true : false}
            transition={transition}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1 }}
            whileTap={{scale: 1.1 }}
            onClick={() => clicked(index)}
            onDragStart={() => dragging = true}
            onDragEnd={() => dragging = false}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            // variants={variants}
            onHoverStart={() => {setHoverDesktop(true)}}
            onHoverEnd={() => {setHoverDesktop(false)}}
            // animate={show ? 'show' : 'hide'}
        >
            <Title className='body-small'>{data.title}</Title>
            
            <Background animate={state.questions[index]?.hasAnswered ? 'show' : 'hide'} variants={backgroundVariants}>
              {
                backgroundImage &&
                <Image data={backgroundImage} />
              }
            </Background>
            <Object>
                <ThreeJSObject gltfObject={data.gltfObject && getFileAsset(data.gltfObject, sanityConfig).url} rotationX={data.rotationX} positionY={data.positionY} rotate={hover} />
            </Object>
        </Container>
    )
}

