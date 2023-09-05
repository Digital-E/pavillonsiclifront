import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { store } from '../../../store'

import styled from 'styled-components'

import Tile from './tile'

const Container = styled.div`
    min-height: 100vh;
`

const Title = styled.p`
    width: fit-content;
    text-transform: uppercase;
    margin: 100px auto 50px auto;
`

const Grid = styled.div`
    width: var(--header-width);
    margin: 0 auto;
    background: white;

    @media(max-width: 989px) {
        // width: auto;
        // min-width: 800px;
        margin-bottom: 150px;
    }
`

const InnerGrid = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    > div:nth-child(4n + 1) {
        background: linear-gradient(209.22deg, rgba(0, 0, 0, 0) 45.9%, rgba(0, 0, 0, 0.05) 100%);
    }

    &.threshold > div:nth-child(4n + 1):after {
        content: '';
        position: absolute;
        width: 400px;
        height: 200px;
        // background: radial-gradient(#000000 0%, transparent 70%, transparent 100% );
        background-image: url('/images/ellipse.png');
        background-repeat: no-repeat;
        opacity: 0;
        transform: rotate(-16deg);
    }

    &.threshold-1 > div:nth-child(4n + 1):after {
        opacity: 0.4;
    }

    &.threshold-2 > div:nth-child(4n + 1):after {
        opacity: 0.6;
    }

    &.threshold-3 > div:nth-child(4n + 1):after {
        opacity: 0.8;
    }

    > div:nth-child(4n + 2) {
        background: linear-gradient(205.89deg, rgba(0, 0, 0, 0) 42.43%, rgba(0, 0, 0, 0.05) 100%);
    }

    > div:nth-child(4n + 3) {
        background: linear-gradient(208.6deg, rgba(0, 0, 0, 0) 42.19%, rgba(0, 0, 0, 0.05) 100%);
    }

    > div:nth-child(4n + 4) {
        background: linear-gradient(207.85deg, rgba(0, 0, 0, 0) 47.89%, rgba(0, 0, 0, 0.05) 100%);
    }

    &.threshold > div:nth-child(4n + 4):after {
        content: '';
        position: absolute;
        width: 400px;
        height: 200px;
        // background: radial-gradient(#000000 0%, transparent 70%, transparent 100% );
        background-image: url('/images/ellipse.png');
        background-repeat: no-repeat;
        opacity: 0;
        transform: rotate(-16deg);
    }

    &.threshold-1 > div:nth-child(4n + 4):after {
        opacity: 0.4;
    }

    &.threshold-2 > div:nth-child(4n + 4):after {
        opacity: 0.6;
    }

    &.threshold-3 > div:nth-child(4n + 4):after {
        opacity: 0.8;
    }

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: stretch;

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 20px 0 20px 0;
        z-index: 1;
        width: 100%;
    }

    > div:first-child > img {
        display: block;
        margin: 0 auto;
    }

    > div:first-child {
        background: linear-gradient(208.6deg, rgba(0, 0, 0, 0) 42.19%, rgba(0, 0, 0, 0.05) 100%);
    }

    > div:last-child {
        background: linear-gradient(207.85deg, rgba(0, 0, 0, 0) 47.89%, rgba(0, 0, 0, 0.05) 100%);
    }

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const LinkAlignBottom = styled.p`
    position: absolute;
    display: block;
    width: fit-content;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    color: black;
    text-transform: uppercase;
    margin: 0;
    padding: 0;

    @media(max-width: 989px) {
        position: relative;
        bottom: 0;
        transform: 0;
        margin-top: 30px;
    }
`


const ResultSentence = styled.div`
    > p {
        font-size: 16px;
        color: black;
        text-align: center;
        text-transform: uppercase;
        margin: 0;
        padding: 40px;
    }

    > div {
        position: absolute;
        width: 70px;
    }

    > div > img {
        width: 100%;
    }

    > div:nth-child(2) {
        top: 0;
        left: 0;
        width: 50px;
    }

    > div:nth-child(3) {
        top: 0;
        right: 0;
    }

    > div:nth-child(4) {
        bottom: 0;
        right: 0;
    }

    > div:nth-child(5) {
        bottom: 0;
        left: 0;
        width: 80px;
    }
`



export default function Component ({ data = {}, footerData, preview = false }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    const router = useRouter()

    let [answers, setAnswers] = useState([])
    let [threshold, setThreshold] = useState(0)


    useEffect(() => {
        let id = router.query.id
        let answers = [];

        if(id !== undefined) {
            id.split('q').forEach(item => {
                if(item !== '') {
                    answers.push(item)
                }
            })
        }

        answers = answers.map(item => {
            return item.split('a')
        })

        setAnswers(answers)

        // Calculate Average

        let totalWeight = 0
        let answersCount = answers.length

        answers.forEach((item, index) => {
            totalWeight += state.questionsInit[item[0]]?.answers[item[1]].weight
        })

        // console.log(totalWeight, answersCount)

        let averageWeight = totalWeight / answersCount

        if(averageWeight < 0.25) { setThreshold(0); return resize()}
        if(averageWeight < 0.5) { setThreshold(1); return resize()}
        if(averageWeight < 0.75) { setThreshold(2); return resize()}

        setThreshold(3)

    }, [router])

    const resize = () => {
        setTimeout(() => {
            let resultsContainer = document.querySelector('.results-container')

            resultsContainer.style.height = `${document.querySelector('.results-container').getBoundingClientRect().height}px`
        }, 100)
    }

    return (
        <Container>
            <Title className='body-small'>Thank you for taking part!</Title>
            <Grid className='results-container'>
                <div>
                    <Header>
                        <div>
                            <div>
                                <img src='/logo/logo-black.svg' />
                                <LinkAlignBottom className='body-x-small'>art4biodiversity.org</LinkAlignBottom>
                            </div>
                        </div>
                        <ResultSentence>
                            <p>{state.sentences[threshold]}</p>
                            <div><img src='/images/result-images/bin.png'/></div>
                            <div><img src='/images/result-images/house.png'/></div>
                            <div><img src='/images/result-images/meat.png'/></div>
                            <div><img src='/images/result-images/plane.png'/></div>
                        </ResultSentence>
                    </Header>                
                    <InnerGrid 
                    // className={`threshold threshold-${threshold}`}
                    >
                        {answers?.map(item => <Tile data={state.questionsInit[item[0]]?.answers[item[1]]} />)}
                    </InnerGrid>
                </div>
            </Grid>
        </Container>
    )
}

