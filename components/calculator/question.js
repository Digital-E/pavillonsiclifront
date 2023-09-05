import { useEffect, useState, useContext } from 'react'
import { store } from '../../store'

import styled from 'styled-components'
import { motion } from 'framer-motion'

import Body from '../body'

import Interaction from './interaction'
import QuestionAnswered from './question-answered'


const Container = styled.div``

const Popup = styled(motion.div)`
    position: fixed;    
    width: var(--header-width);
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(40px);
    height: calc(100% - 50px);
    z-index: 999;
    box-sizing: border-box;
    overflow: scroll;

    &&.show-question {
        opacity: 1;
        transition: transform ease-in-out 0.3s;
    }

    &&.hide-question {
        opacity: 0;
        transition: transform ease-in-out 0.3s;
        pointer-events: none;
    }

    @media(min-width: 1800px) {

    }
      

    @media(max-width: 989px) {
        &&.hide-question {
            transform: translateY(calc(100% + 76px));
        }
    }
`;

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 1;

    &.show-overlay {
        opacity: 1;
        // transition: opacity ease-in-out 0.3s 0s, transform linear 0s 0s;  
        transition: 0s;
        transform: translateX(0);
        height: 100vh;
        transition: height 0s 0.3s;
    }

    &.hide-overlay {
        opacity: 0;
        // transition: opacity ease-in-out 0.3s, transform linear 0s 0.3s;
        transition: height 0s 0s;
        transform: translateX(-100%);
        height: 0;
    }
`

const Close = styled.div`
    cursor: pointer;
    width: fit-content;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.p`
    font-size: 42px;
    margin: 0;

    @media(max-width: 989px) {
        font-size: 32px
    }
`

const QuestionText = styled.div`
    text-align: center;
    margin-top: 70px;

    p {
        font-size: 1.5rem;
    }

    h5 {
        font-size: 1.125rem;
    }

    * {
        margin: 0 0 10px 0;
        line-height: 1.4;
    }

    @media(max-width: 989px) {
        margin-top: 30px;
        
        p {
            font-size: 1.25rem;
        }
    }
`
const QuestionInteract = styled.div`
    padding: 30px 30px 100px 30px;

    @media(max-width: 989px) {
        padding: 20px 20px 0 20px;
    }
`

let variants  = {
    'initial': {
        opacity: 0,
    },
    'show': {
        opacity: 1,
        pointerEvents: "all",
        transition: {
            opacity: {
                duration: 0.3,
            }
        }
    },
    'hide': {
        opacity: 0,
        transitionEnd: {
            pointerEvents: "none",
        },
    }
}


export default function Component ({ data }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [display, setDisplay] = useState(false)
    let [currentIndex, setCurrentIndex] = useState(0)
    let [questionAnswered, setQuestionAnswered] = useState(false)

    let blurAllTiles = () => {
        document.querySelectorAll('.question-card').forEach(item => item.classList.add('blur-question-tile'))
    }

    let unBlurAllTiles = () => {
        document.querySelectorAll('.question-card').forEach(item => item.classList.remove('blur-question-tile'))
    }

    useEffect(() => {

        unBlurAllTiles();
        
        state.questions.forEach((item, index) => {
            if(item.isOpen) {
                blurAllTiles();
                setCurrentIndex(index)
                setDisplay(true)
            }
        })
    }, [state.questions])

    let hasSubmitted = () => {
        setQuestionAnswered(true)

        let items = JSON.parse(JSON.stringify(state.questions))

        items[currentIndex].hasAnswered = true

        dispatch({type: 'update questions', value: items})
    }

    let close = () => {

        setDisplay(false)
        
        let items = JSON.parse(JSON.stringify(state.questions))

        items.forEach(item => item.isOpen = false)

        dispatch({type: 'update questions', value: items})
    }

    return (
        <Container>
            <Overlay onClick={() => close()} className={display ? 'show-overlay' : 'hide-overlay'}/>
            <Popup initial={'hide'} animate={display ? 'show' : 'hide'} variants={variants}
              onAnimationStart={definition => {
                if(definition === 'show') {
                    setQuestionAnswered(false)
                }
              }}
            >
                {
                    !questionAnswered ?
                        <QuestionInteract>
                            <Header>
                                <Title>{data[currentIndex].title}</Title>
                                <Close onClick={() => close()}>
                                    <img src='/icons/close.svg' />
                                </Close>
                            </Header>
                            <QuestionText>
                                <Body content={data[currentIndex].text} />
                            </QuestionText>
                            <Interaction key={currentIndex} index={currentIndex} hasSubmitted={() => hasSubmitted()}/> 
                        </QuestionInteract>
                        :
                        <QuestionAnswered data={data[currentIndex]?.answers[state.questions[currentIndex].selectedIndex]} close={() => close()}/>                          
                }        
            </Popup>
        </Container>
    )
}

