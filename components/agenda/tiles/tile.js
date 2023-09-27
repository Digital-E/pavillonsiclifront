import styled from 'styled-components'
import Body from '../../body'
import Image from '../../image'
import Link from '../../link'

const Container = styled.div`
    min-height: 300px;

    > a {
        display: flex;
        flex-direction: column;
        padding: calc(var(--margin) / 1.5) var(--margin);
        box-sizing: border-box;
        height: 100%;
        color: ${props => props.isDark ? 'white' : ''};
    }

    :hover .agenda-vignette {
        display: block;
    }
`

const InformationTop = styled.div`
    display: flex;

    > p {
        margin: 0;
    }

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

const InformationBottom = styled.div`
    margin-top: auto;

    > p {
        margin: 0 !important;
    }
`


const Info = styled.p`
    color: ${props => props.grey ? 'grey' : 'inherit'};
`

const Title = styled.div`
    margin: calc(var(--margin)) 0 calc(var(--margin) * 2) 0;

    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        margin: 0;
        line-height: 1;
        color: ${props => props.grey ? 'grey' : 'inherit'};
    }
`

const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: none;

    > div, img {
        position: absolute;
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
    }
`


export default function Component ({ data, isDark }) {

    let day = new Date(data.dateAndTime).getDate()
    let month = new Date(data.dateAndTime).getMonth() + 1
    let year = new Date(data.dateAndTime).getFullYear()
    
    let date = `${month}-${day}-${year}`

    return (
        <Container isDark={isDark} data-date={date} className='agenda-tile'>
            <Link href={data.slug}>
                <InformationTop>
                    <Info>{data.info1}</Info>
                    <Info>{data.info2}</Info>
                    <Info>{data.info3}</Info>
                </InformationTop>
                <Title className='h1' grey={data.grey}>
                    <Body content={data.title} />
                </Title>
                <InformationBottom>
                    <Info grey={data.grey}>{data.info4}</Info>
                </InformationBottom>
                <ImageWrapper className='agenda-vignette'>
                    <Image data={data.vignette} />
                </ImageWrapper>
            </Link>
        </Container>
    )
}