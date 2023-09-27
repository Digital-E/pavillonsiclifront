import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    align-items: center;

    &:empty {
        display: none;
    }
    
    @media(max-width: 989px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

const Label = styled.h4`
    margin: 0 var(--margin) 0 0;
`

const Filter = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid var(--black);
    border-radius: 999px;
    padding: calc(var(--margin) / 2) calc(var(--margin) * 2);
    color: var(--grey);
    width: 70%;
    cursor: pointer;

    &&.selected {
        color: var(--black);
    }

    @media(max-width: 989px) {
        margin-top: var(--margin);
        width: 100%;
    }
`

const Option = styled.option``


export default function Component ({ data, indexOne, toggleFilters }) {
    let filterRef = useRef();
    let [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        let isSelectedVar = false;

        data.filters?.forEach((item, index) => {
            if(item.selected && index !== 0) {
                isSelectedVar = true;

                filterRef.current.selectedIndex = index;
            }
        })

        setIsSelected(isSelectedVar)

        if(!isSelectedVar && filterRef.current) {
            filterRef.current.selectedIndex = 0;
        }
    }, [data])

    return (
        <Container>
            {data.category && <Label>{data.category}</Label>}
            {
                data.filters ?
                    <Filter ref={filterRef} onChange={(e) => toggleFilters(indexOne, parseInt(e.currentTarget.value))} className={isSelected && 'selected'}>
                        {data.filters?.map((item, indexTwo) => <Option  className='p' value={indexTwo}>{item.label}</Option>)} 
                    </Filter>  
                :
                null
            }             
        </Container>
    )
}