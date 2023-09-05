import styled from 'styled-components'

const Container = styled.div`
    margin-bottom: 30px;
`

const InnerContainer = styled.div`
    text-align: center;
    margin: 0 15px;
`

const Title = styled.p`
    margin: 0 0 10px 0;
`

const Subtitle = styled.p`
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
`



export default function Component({ data }) {

    return (
        <Container data-anchor={data.slug.current} id={`slice-${data.slug.current}`} className='anchor-title'>
            <InnerContainer>
                <Title className='body-large'>{data.title}</Title>
                <Subtitle>{data.subtitle}</Subtitle>
            </InnerContainer>
        </Container>
    )
}