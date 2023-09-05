import styled from 'styled-components'
import Body from '../body'

const Container = styled.div`
    margin: 30px 15px;
    text-align: ${props => props.align === 'center' ? 'center' : ''};

    p {
        font-size: inherit;
    }
`

export default function Component({ data }) {

    return (
        <Container className='body-large' align={data.align}>
            <Body content={data.text} />
        </Container>
    )
}