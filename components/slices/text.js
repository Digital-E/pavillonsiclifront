import styled from 'styled-components'
import Body from '../body'

const Container = styled.div``

export default function Component({ data }) {

    return (
        <Container>
            <Body content={data.text} />
        </Container>
    )
}