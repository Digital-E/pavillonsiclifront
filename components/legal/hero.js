import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Image from '../image'


const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const InnerContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 75%;
    width: var(--header-width);
    margin: 0 auto;
`


const Information = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    @media(max-width: 989px) {
        padding: 0 15px;
        bottom: 0;
    }
`

const Title = styled.p`
    text-transform: uppercase;
`

const Description = styled.p``

const Date = styled.p``

const Logo = styled.div`
    width: 120px;
    margin-bottom: 30px;

    > div {
        background: transparent;
    }
`
const BackgroundImage = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 0;

    > div:nth-child(2), img {
        height: 100% !important;
        object-fit: cover;
    }
`

const Gradient = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, black 30%, transparent 100%);
    z-index: 1;

    @media(max-width: 989px) {
        background: linear-gradient(0deg, black 10%, transparent 50%, transparent 100%);
    }
`



export default function Component ({ data }) {



    return (
        <Container>
            <InnerContainer>
                <BackgroundImage>
                    <Gradient />
                    <Image data={data.heroImage} />
                </BackgroundImage>
                <Information>
                    <Logo>
                        <Image data={data.logo} />
                    </Logo>                    
                    <Title className='body-large'>{data.title}</Title>
                    <Description className='body-large'>{data.description}</Description>
                    <Date>{data.date}</Date>
                </Information>
            </InnerContainer>
        </Container>
    )
}

