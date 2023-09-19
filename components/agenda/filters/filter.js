import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    align-items: center;
    
    @media(max-width: 989px) {
        flex-direction: column;
        align-items: flex-start;
        // > h3, > select {
        //     flex-basis: 50%;
        // }
    }
`

const Label = styled.h3`
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

    @media(max-width: 989px) {
        margin-top: var(--margin);
        width: 100%;
    }
`

const Option = styled.option``


export default function Component ({ data, indexOne, toggleFilters }) {


    return (
        <Container>
            <Label>{data.category}</Label>
            {
                data.filters ?
                    <Filter onChange={(e) => toggleFilters(indexOne, parseInt(e.currentTarget.value))}>
                        {data.filters?.map((item, indexTwo) => <Option className='p' value={indexTwo}>{item.label}</Option>)} 
                    </Filter>  
                :
                null
            }             
        </Container>
    )
}