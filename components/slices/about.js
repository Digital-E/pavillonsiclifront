import styled from 'styled-components'
import Sticky from "./sticky"

const Container = styled.div`
    > div:nth-child(1) > div {
        margin-bottom: 260px;
    }

    > div > div:nth-child(2) > *:last-child,
    > div > div:nth-child(2) > *:last-child > *:last-child
     {
        margin-bottom: 0;
    }

    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ul {
        column-count: 2;
        column-gap: 40px;
    }

    @media(max-width: 989px) {
        > div:nth-child(1) > div {
            margin-bottom: 40px;
        }
    }
`

function Component({ data }) {
    return (
        <Container className="slice" data-anchor='the-designers-behind-d'>
            <Sticky data={data} sliceAnchor='the-designers-behind-d'/>
        </Container>
    )
}

export default Component