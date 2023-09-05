import { useEffect, useRef, useContext } from 'react'
import { store } from '../../store'
import styled from 'styled-components'

import Email from './email'


const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 430px;
    margin-top: 30vh;
    z-index: 1;
    box-sizing: border-box;

    @media(max-width: 989px) {
        padding: 0 50px;
    }
`

const Title = styled.div`
    text-transform: uppercase;
    font-size: 60px;
    margin: 40px 0;

    img {
        width: 100%;
    }
`

const Text = styled.p`
    text-align: center;
    margin: 0;
`

const EmailSubscribeWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    z-index: 1;
`



export default function Component ({ data }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let hasSubmitted = () => {
        dispatch({ type: 'update unlocked', value: true})
        sessionStorage.setItem('art4bioCalculatorUnlocked', 'true')
    }


    return (
        <Container>
            <Information>
                <Text>
                    An online calculator that allows you to visualize your global footprint while choosing to act!
                </Text>
                <Title><img src='/logo/carboncalculator.svg' /></Title>
                <Text>
                    Enter your email address to start
                </Text>
            </Information>
            <EmailSubscribeWrapper>
                <Email hasSubmitted={() => hasSubmitted()} />
            </EmailSubscribeWrapper>
        </Container>
    )
}

