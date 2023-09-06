import styled from 'styled-components'
import Body from '../body'


const Container = styled.div`

`

const Title = styled.div`
    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        margin: 0;
    }
`



export default function Component ({ data }) {

    return (
        <Container>
            <Title className='h1'>
                <Body content={data?.title} />
            </Title>
        </Container>
    )
}

