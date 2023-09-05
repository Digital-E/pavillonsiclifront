import styled from 'styled-components'

const Container = styled.div`
    margin-bottom: ${props => props.size === 'medium' ? '100px' : '200px'};

    @media(max-width: 989px) {
        margin-bottom: ${props => props.size === 'medium' ? '80px' : '160px'}
    }
`



export default function Component({ data }) {

    return (
        <Container size={data.size}></Container>
    )
}