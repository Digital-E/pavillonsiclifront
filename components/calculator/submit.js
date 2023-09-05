import { useEffect, useState, useRef, useContext } from 'react'
import { store } from '../../store'

import styled from 'styled-components'
import { motion, animate } from 'framer-motion'

import Link from 'next/link'

import Button from '../button'


const Container = styled(motion.div)`
    position: fixed;
    bottom: 55px;
    left: 50%;
    transform: translate(-50%);
`

let variants = {
    initial: {
      opacity: 1,
      x: '-50%',
      y: '150%'
    },
    show: {
      opacity: 1,
      x: '-50%',
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hide: {
      opacity: 1,
      x: '-50%',
      y: '150%',
      transition: {
        opacity: {
          duration: 0.5
        },
      }
    }
  }

export default function Component ({}) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [shareLink, setShareLink] = useState('/')

    let [show, setShow] = useState(false)

    useEffect(() => {
        if(state.progress * state.questions.length > 5) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [state.progress])

    useEffect(() => {
        let id = 0
        let idArray = []
        let answeredQuestions = []

        answeredQuestions = state.questions.filter(item => item.selectedIndex !== null)

        answeredQuestions.forEach(item => {
            idArray.push(`q${item.index}a${item.selectedIndex}`)
        })



        setShareLink(`/calculator/share?id=${idArray.join('')}`)
    }, [state.questions])
    

    return (
        <Container animate={show ? 'show' : 'hide'} variants={variants}>
            <Link href={shareLink}><Button>Submit</Button></Link>
        </Container>
    )
}

