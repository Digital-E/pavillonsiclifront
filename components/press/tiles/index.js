import styled from 'styled-components'

import Tile from './tile'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    > div {
        position: relative;
        flex-basis: 100%;
    }

    ::before {
        content: '';
        position: absolute;
        background: black;
        height: 1px;
        width: 100%;
        top: 0;
        left: 0;
    }

    > div::after {
        content: '';
        position: absolute;
        background: black;
        height: 1px;
        width: 100%;
        bottom: 0;
        left: 0;
    }
`


export default function Component ({ data }) {
    return (
        <Container>{data.map(item => <Tile data={item} />)}</Container>
    )
}