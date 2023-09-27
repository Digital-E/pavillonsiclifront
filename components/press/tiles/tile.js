import { useRouter } from 'next/router'

import styled from 'styled-components'
import Link from '../../link'

const Container = styled.div`
    > a {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding: calc(var(--margin) * 2) var(--margin);
        box-sizing: border-box;
        height: 100%;
    }

    &.no-link a:hover * {
        color: var(--black) !important
    }

    :hover .agenda-vignette {
        display: block;
    }

    @media(max-width: 989px) {
        > a {
            flex-direction: column;
            flex-wrap: wrap;
            align-items: flex-start;
        }
    }
`

const ColLeft = styled.div`
    display: flex;
    flex-basis: 40%;

    > p {
        padding: 0 var(--margin);
    }

    > p:nth-child(1) {
        flex-basis: 35%;
    }

    > p:nth-child(2) {
        flex-basis: 35%;
    }

    > p:nth-child(3) {
        flex-basis: 30%;
    }

    * {
        margin: 0;
    }

    @media(max-width: 989px) {
        flex-direction: column;
        flex-basis: 100%;

        > p {
            padding: 0;
        }
    }
`

const ColRight = styled.div`
    flex-basis: 60%;

    * {
        margin: 0;
    }  
    
    @media(max-width: 989px) {
        flex-basis: 100%;
    }
`

const Info = styled.p``

const Title = styled.div`
    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        margin: 0;
    }

    @media(max-width: 989px) {
        margin-top: var(--margin)
    }
`


export default function Component ({ data }) {

    return (
        <Container className={data.link === undefined && 'no-link'}>
            <Link href={data.link}>
                <ColLeft>
                    <Info>{data.info1}</Info>
                    <Info>{data.info2}</Info>
                    <Info>{data.info3}</Info>
                </ColLeft>
                <ColRight>
                    <Title className='h2' grey={data.grey}>
                        {data.title}
                    </Title>
                </ColRight>
            </Link>
        </Container>
    )
}