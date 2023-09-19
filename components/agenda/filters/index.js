import styled from 'styled-components'

import Filter from './filter'

const Container = styled.div`
    display: flex;
    padding: var(--margin);

    > div {
        flex-basis: 33.3333%;
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            margin: calc(var(--margin) / 2)
        }
    }
`


export default function Component ({ data, toggleFilters }) {

    return (
        <Container>
            {data.map((item, index) => <Filter data={item} indexOne={index} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} />)}
        </Container>
    )
}