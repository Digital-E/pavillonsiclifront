import styled from 'styled-components'
import Body from '../body'


const Container = styled.div`

`

const Title = styled.div`
    position: relative;
    padding-bottom: calc(var(--margin) / 2);
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

const Information = styled.div`
    display: flex;
    padding: var(--margin) 0;
    border-bottom: 1px solid var(--black);
`

const Info = styled.h3`
    display: block;

    margin: 0;

    :not(:last-child) {
        margin: 0 calc(6 * var(--margin)) 0 0 !important;
    }
`
const Excerpt = styled.div`
    margin: 0 0 calc(2 * var(--margin)) 0;
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
            </Information>
            <Excerpt className='h3'>
                <Body content={data?.excerpt} />
            </Excerpt>
        </Container>
    )
}

