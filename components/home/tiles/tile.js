import styled from 'styled-components'
import Body from '../../body'
import Image from '../../image'
import Link from '../../link'

const Container = styled.div`
    > a {
        display: flex;
        flex-direction: column;
        padding: calc(var(--margin) / 1.5) var(--margin);
        box-sizing: border-box;
        height: 100%;
    }

    :hover {
        background: var(--black) !important;
    }

    > a:hover * {
        color: white !important;
    }
`

const InformationTop = styled.div`
    display: flex;
    margin-bottom: 60px;

    > p:not(:last-child) {
        margin-right: 40px
    }

    @media(max-width: 989px) {
        flex-wrap: wrap;

        > p:nth-child(n) {
            flex-basis: 50%;
            margin: 0;
        }

        > p:nth-child(2) {
            text-align: right;
        }

        > p:nth-child(3) {
            flex-basis: 100%
        }
    }
`

const Info = styled.p`
    color: ${props => props.grey ? 'grey' : 'inherit'};
`

const Title = styled.div`
    margin: auto 0 0 0;

    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        margin: 0;
        color: ${props => props.grey ? 'grey' : 'inherit'};
    }
`

const ImageWrapper = styled.div`
    position: relative;
    height: 300px;
    overflow: hidden;
    margin-top: var(--margin);

    > div, img {
        position: absolute;
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
    }
`


export default function Component ({ data }) {

    return (
        <Container>
            <Link href={data.link || data.slug}>
                <InformationTop>
                    <Info>{data.info1}</Info>
                    <Info>{data.info2}</Info>
                    <Info grey={data.grey}>{data.info3}</Info>
                </InformationTop>
                <Title className='h2' grey={data.grey}>
                    <Body content={data.title} />
                </Title>
                <ImageWrapper>
                    <Image data={data.image || data.vignette} />
                </ImageWrapper>
            </Link>
        </Container>
    )
}