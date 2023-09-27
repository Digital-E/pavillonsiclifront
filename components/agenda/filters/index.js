import styled from 'styled-components'

import Filter from './filter'

const Container = styled.div`
    position: sticky;
    top: var(--menu-height);
    z-index: 999;
    background: white;
`

const Filters = styled.div`
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

const Reset = styled.div`
    padding: var(--margin);
    cursor: pointer;
    flex-basis: auto !important;
    color: var(--grey);
`




export default function Component ({ data, toggleFilters, resetAll }) {

    return (
        <Container>
            <Filters>
                {data.map((item, index) => <Filter data={item} indexOne={index} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} />)}
                <Reset onClick={() => resetAll()}>Reset</Reset>
            </Filters>
        </Container>
    )
}