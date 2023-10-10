import styled from 'styled-components'
import Body from '../body'


const Container = styled.div`

`

const Title = styled.div`
    position: relative;
    padding-bottom: calc(var(--margin) * 1.5);
    border-bottom: 1px solid var(--black);
    margin: 0;

    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        line-height: inherit;
        margin: 0;
    }
    
    @media(max-width: 989px) {
        margin-top: var(--margin);
    }
`

const Information = styled.div`
    display: flex;
    padding: var(--margin) 0;
    border-bottom: 1px solid var(--black);

    @media(max-width: 989px) {
        flex-wrap: wrap;

        > h3:nth-child(1), > h3:nth-child(2) {
            flex-basis: 50%;
        }

        > h3:nth-child(2), h3:nth-child(4) {
            text-align: right;
        }

        > h3:nth-child(3), > h3:nth-child(4) {
            margin-top: var(--margin);
            display: block;
        }
    }
`

const Info = styled.h3`
    display: block;

    margin: 0;

    :not(:last-child) {
        margin: 0 calc(6 * var(--margin)) 0 0 !important;
    }

    @media(max-width: 989px) {
        :not(:last-child) {
            margin: 0 !important;
        }
    }

`
const Excerpt = styled.div`
    margin: 0 0 calc(var(--margin)) 0;
    padding: var(--margin) 0;
    border-bottom: 1px solid var(--black);

    * {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        line-height: inherit;
        margin: 0;
    } 
`


export default function Component ({ data }) {

    return (
        <Container>
            <Title className='h1'>
                <Body content={data?.title} />
            </Title>
            <Information>
                <Info>{data.info1}</Info>
                <Info>{data.info2}</Info>
                <Info>{data.info3}</Info>
                <Info>{data.info4}</Info>
            </Information>
            {
                data?.excerpt &&
                <Excerpt className='h3'>
                    <Body content={data?.excerpt} />
                </Excerpt>
            }
        </Container>
    )
}

