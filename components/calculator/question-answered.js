import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Body from '../body'

import Image from '../image'

import Button from '../button'

const Container = styled.div`

`

const Title = styled.p`
    margin: 50px auto 50px auto;
    text-transform: uppercase;
    text-align: center;
`

const Text = styled.div`
    padding: 20px 30px 0 30px;

    h5 {
        font-size: 1.125rem;
    }

    h6 {
        font-size: 0.75rem;
        line-height: 1.2;
    }

    @media(max-width: 989px) {
        padding: 20px 15px 0 15px;
    }
`

const ButtonWrapper = styled.div`
    width: fit-content;
    margin: 30px auto;

    div {
        margin: 0;
    }
`

export default function Component ({ data, close }) {

    if(data === undefined) return null

    return (
        <Container>
            <Title className='body-small'>{data.title}</Title>
            <Image data={data.image} />
            <Text>
                <Body content={data.text} />
            </Text>
            <ButtonWrapper onClick={() => close()}>
                <Button>OK</Button>
            </ButtonWrapper>
        </Container>
    )
}

