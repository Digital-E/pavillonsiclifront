import styled from 'styled-components'

import Filter from './filter'

const Container = styled.div`
    display: flex;
    padding: var(--margin) var(--margin) 0 var(--margin);

    > div {
        flex-basis: 33.3333%;
    }
`


export default function Component ({ data, toggleFilters }) {

    return (
        <Container>
            {data.map((item, index) => <Filter data={item} indexOne={index} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} />)}
        </Container>
    )
}