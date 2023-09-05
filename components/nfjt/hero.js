import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Coin from './coin'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100vh;
`

const Information = styled.div`
    display: flex;
    flex-direction: column;
    width: var(--header-width);
    margin-bottom: 100px;
    height: 100%;

    > div:first-child {
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-self: flex-start;
        flex-grow: 1;
        margin-top: 50px;
    }

    @media(max-width: 989px) {
        margin: 0 15px 100px 15px;
    }
`

const Title = styled.p`
    text-transform: uppercase;
`

const Description = styled.p``

const Authors = styled.p``


export default function Component ({ data }) {

    return (
        <Container>
            <Information>
                <div>
                    <Coin />
                </div>
                <div>
                    <Title className='body-large'>{data.title}</Title>
                    <Description className='body-large'>{data.description}</Description>
                    <Authors>{data.authors}</Authors>
                </div>
            </Information>
        </Container>
    )
}

