import {useRef, useEffect} from 'react'
import styled from 'styled-components'
import Body from '../body'
import Form from './forms/form'

const Container = styled.div`

`

const InnerContainer = styled.div`
    max-width: var(--header-width);
    margin: 0 auto;

    @media(max-width: 989px) {
        max-width: none;
        box-sizing: border-box;
        padding: 0 15px;
    }
`


export default function Component({ data }) {

    return (
        <Container>
            <InnerContainer>
                <Body content={data.text} />
                <Form />
            </InnerContainer>
        </Container>
    )
}