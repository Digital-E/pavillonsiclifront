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

const Excerpt = styled.div`
    margin: 0 0 calc(2 * var(--margin)) 0;
    padding: var(--margin) 0;

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
            <Excerpt className='h3'>
                <Body content={data.textOne} />
            </Excerpt>
        </Container>
    )
}

