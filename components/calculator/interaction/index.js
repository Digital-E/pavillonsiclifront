import { useContext, useState, useEffect } from 'react'
import { store } from '../../../store'

import styled from 'styled-components'

import DragLine from './drag-line'
import Drag from './drag'
import Pick from './pick'

const Container = styled.div``

let renderSlice = (data, index, hasSubmitted) => {

    switch(data.interaction) {
        case 'Drag Line':
        return <DragLine data={data} index={index} hasSubmitted={() => hasSubmitted()}/>
        case 'Drag':
        return <Drag data={data} index={index} hasSubmitted={() => hasSubmitted()}/>        
        case 'Pick':
        return <Pick data={data} index={index} hasSubmitted={() => hasSubmitted()}/>       
        default:
        return null
    }
}

export default function Component ({ index, hasSubmitted }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(state.questions[index]?.isOpen) {
            setIsOpen(true)
        } else {
            setTimeout(() => {
                setIsOpen(false)
            }, 300)
        }
    }, [state.questions[index]?.isOpen])

    return (
        <Container>
            {
                isOpen ?
                renderSlice(state.questions[index], index, hasSubmitted)
                :
                null
            }
        </Container>
    )
}

