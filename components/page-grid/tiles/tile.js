import styled from 'styled-components'
import Body from '../../body'
import Image from '../../image'

const Container = styled.div`
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: calc(var(--margin) / 1.5) var(--margin);
    box-sizing: border-box;
    height: 100%;
`



const Text = styled.div`
    margin: var(--margin) 0 var(--margin) 0;
`

const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    margin-top: var(--margin);
`


export default function Component ({ data }) {

    return (
        <Container>
            <InnerContainer>
                {data.image && 
                <ImageWrapper>
                    <Image data={data.image || data.vignette} />
                </ImageWrapper>
                }
                <Text>
                    <Body content={data.text} />
                </Text>
            </InnerContainer>
        </Container>
    )
}