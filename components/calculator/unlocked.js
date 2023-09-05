import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Restart from './restart'
import Question from './question'
import QuestionTiles from './question-tiles'
import Progress from './progress'
import Submit from './submit'

import ThreeJSObjectTestFullTemplate from './three-js-object-test-full-template'
import ThreeJSObjectTestFullTemplate2 from './three-js-object-test-full-template-2'
import ThreeJSObjectTestFullTemplateCopy from './three-js-object-test-full-template-2-copy'

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`



export default function Component ({ data, closeQuestion }) {

    useEffect(() => {
        document.querySelector('footer').style.display = 'none'

        return () => {
            if(document.querySelector('footer')) {
                document.querySelector('footer').style.display = 'flex'
            }
        }
    }, [])

    return (
        <Container>
            <Progress />
            {/* <ThreeJSObjectTestFullTemplate /> */}
            {/* <ThreeJSObjectTestFullTemplate2 /> */}
            {/* <ThreeJSObjectTestFullTemplateCopy /> */}
            <Restart />
            <Question data={data} closeQuestion={(index) => closeQuestion(index)}/>
            <QuestionTiles data={data} />
            <Submit />
        </Container>
    )
}

