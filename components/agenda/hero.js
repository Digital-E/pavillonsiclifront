import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    text-align: center;

    h1 {
        padding: calc(var(--margin) * 4) 0;
    }
`

export default function Component ({ data }) {

    return (
        <Container>
            <h1>{data.title}</h1>
        </Container>
    )
}

