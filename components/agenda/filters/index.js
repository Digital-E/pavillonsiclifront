import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Filter from './filter'

const Container = styled.div`
    position: sticky;
    top: var(--menu-height);
    z-index: 999;
    background: white;

    @media(max-width: 989px) {
        border-bottom: 1px solid var(--black);
    }
`

const Filters = styled.div`
    display: flex;
    width: 100%;
    padding: var(--margin);
    box-sizing: border-box;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const FiltersInner = styled.div`
    display: flex;
    width: 100%;

    > div {
        flex-basis: 33.3333%;
    }

    @media(max-width: 989px) {
        display: none;
        flex-direction: column;

        > div {
            margin: calc(var(--margin) / 2)
        }

        > div:last-child {
            display: none;
        }
    }

    &.mobile-filters--open {
        display: flex;
    }
`


const ResetAndMobileToggle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 990px) {
        display: none;
    }
`

const MobileToggle = styled.div`
`

const Reset = styled.div`
    padding: var(--margin);
    cursor: pointer;
    flex-basis: auto !important;
    color: var(--grey);
`



export default function Component ({ data, toggleFilters, resetAll }) {
    let router = useRouter();
    let filtersInnerRef = useRef();
    let [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const toggleMobileFiltersOpen = () => {
        setMobileFiltersOpen(!mobileFiltersOpen)
    }

    return (
        <Container>
            <Filters>
                <FiltersInner ref={filtersInnerRef} className={mobileFiltersOpen && 'mobile-filters--open'}>
                    {data.map((item, index) => <Filter data={item} indexOne={index} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} />)}
                    <Reset onClick={() => resetAll()}>Reset</Reset>
                </FiltersInner>
                <ResetAndMobileToggle>
                    <MobileToggle onClick={() => toggleMobileFiltersOpen()}>{`${router.query.language === 'fr' ? 'Filtres' : 'Filters'} ${mobileFiltersOpen ? '-' : '+'}`}</MobileToggle>
                    <Reset onClick={() => resetAll()}>Reset</Reset>
                </ResetAndMobileToggle>
            </Filters>
        </Container>
    )
}