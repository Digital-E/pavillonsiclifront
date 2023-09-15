import styled from 'styled-components'
import Link from '../link'

const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 0 var(--margin);
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    background: ${props => props.isDark ? 'var(--black)' : ''};
    color: ${props => props.isDark ? 'white' : ''};

    h1 {
        padding: calc(var(--margin) * 4) 0;
    }
`

const Prev = styled.div`
    * {
        font-size: inherit;
    }
`

const Next = styled.div`
    * {
        font-size: inherit;
    }
`


export default function Component ({ data, isDark }) {

    return (
        <Container isDark={isDark}>
            <Prev className='h2'><Link href={data.linkPrev}>{`<`}</Link></Prev>
            <h1>{data.title}</h1>
            <Next className='h2'><Link href={data.linkNext}>{`>`}</Link></Next>
        </Container>
    )
}

