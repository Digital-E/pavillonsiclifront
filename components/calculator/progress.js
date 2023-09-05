import { useEffect, useState, useRef, useContext } from 'react'
import { store } from '../../store'

import styled from 'styled-components'
import { motion, animate } from 'framer-motion'


const Container = styled(motion.div)`
    position: fixed;
    top: 100px;
    z-index: 998;

    p {
        text-transform: uppercase;
        margin: 0;
    }
`

const Progress = styled.div`
    position: relative;
    width: 160px;
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
    margin: 15px auto;
`

const ProgressBar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => props.progress * 100}%;
    height: 100%;
    background: ${props => props.unlocked ? ' rgba(0, 255, 10, 1)' : 'rgba(255, 255, 255, 1)'};
    transition: width 1s, background 1s;
`

const Message = styled.div``


export default function Component ({}) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;
    

    useEffect(() => {
        let hasAnsweredCount = 0;

        state.questions.forEach(item => {
            if(item.hasAnswered) {
                hasAnsweredCount += 1
            }
        })

        let progress = hasAnsweredCount / state.questions.length

        dispatch({ type: 'update progress', value: progress})
    }, [state.questions])

    return (
        <Container>
            <Message>
                {
                    state.progress < 0.6 ?
                    <p className='body-small'>Answer at least 6 questions</p>
                    :
                    <p className='body-small'>You are ready to go</p>
                }
            </Message>
            <Progress><ProgressBar progress={state.progress} unlocked={state.progress >= 0.6}/></Progress>
        </Container>
    )
}

