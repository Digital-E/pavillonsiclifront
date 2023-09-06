import styled from 'styled-components'

import Tile from './tile'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;

    > div {
        position: relative;
        flex-basis: 33.3333%;
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

    > div:nth-child(3n + 1)::after,
    > div:nth-child(3n + 2)::after {
        content: '';
        position: absolute;
        background: black;
        height: 100%;
        width: 1px;
        top: 0;
        right: 0;
    }

    > div::before {
        content: '';
        position: absolute;
        background: black;
        height: 1px;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    @media(max-width: 1200px) {
        > div {
            flex-basis: 50%;
        }

        > div:nth-child(even)::after {
            display: none;
        }

        > div:nth-child(odd)::after {
            content: '';
            position: absolute;
            background: black;
            height: 100%;
            width: 1px;
            top: 0;
            right: 0;
        }
    }

    @media(max-width: 989px) {
        > div {
            flex-basis: 100%;
        }

        > div::after {
            display: none;
        }
    }
`


export default function Component ({ data }) {
    return (
        <Container>{data.map(item => <Tile data={item} />)}</Container>
    )
}