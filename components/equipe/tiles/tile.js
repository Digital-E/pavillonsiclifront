import styled from 'styled-components'
import Body from '../../body'
import Image from '../../image'
import Link from '../../link'

const Container = styled.div`
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: calc(var(--margin) / 1.5) var(--margin);
    box-sizing: border-box;
    height: 100%;
`

const InformationTop = styled.div``

const InformationMiddle = styled.div``

const InformationBottom = styled.div`
    display: flex;

    > div {
        flex-basis: 50%;
    }
`



const Info = styled.div`
    * {
        margin: 0;
    }
`

const Title = styled.div`
    margin: auto 0 var(--margin) 0;

    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        line-height: 1;
        margin: 0;
    }
`

const ImageWrapper = styled.div`
    position: relative;
    // height: 400px;
    overflow: hidden;
    margin-top: var(--margin);

    > div, img {
        // position: absolute;
        // height: 100% !important;
        // width: 100% !important;
        object-fit: cover;
    }

    @media(max-width: 989px) {
        height: auto;

        > div, img {
            position: relative;
            height: auto !important;
            width: 100% !important;
            object-fit: cover;
        }
    }
`


export default function Component ({ data }) {

    return (
        <Container>
            <InnerContainer>
                <InformationTop>
                    <Title className='h2'>{data.title}</Title>
                </InformationTop>
                <InformationMiddle>
                    <Info><Body content={data.info1} /></Info>
                </InformationMiddle>
                <InformationBottom>
                    <Info><Body content={data.info2} /></Info>
                    <Info><Body content={data.info3} /></Info>
                </InformationBottom>
                {data.image && 
                <ImageWrapper>
                    <Image data={data.image || data.vignette} />
                </ImageWrapper>
                }
            </InnerContainer>
        </Container>
    )
}