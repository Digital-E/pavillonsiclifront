import styled from 'styled-components'

import Body from '../body'

// Slices
import Image from '../image'
import Text from './text'
import Video from '../video-embed'
import Button from './button'

const Container = styled.div`
`

const SliceWrapper = styled.div`
    margin: 0 0 calc(2 * var(--margin)) 0;
`

let renderSlice = (slice, index) => {
    
    switch(slice._type) {
        case 'captionImage':
        return <SliceWrapper key={slice._id}><Image data={slice} /></SliceWrapper>          
        case 'textObject':
        return <SliceWrapper key={slice._id}><Text data={slice} /></SliceWrapper>  
        case 'video':
        return <SliceWrapper key={slice._id}><Video data={slice} /></SliceWrapper>  
        case 'button':
        return <SliceWrapper key={slice._id}><Button data={slice} /></SliceWrapper>          
        default:      
        return null
    }
}  

function Slices({ data }) {

    return (
        <Container>
            {data?.map((slice, index) => renderSlice(slice, index))}
        </Container>
    )
}

export default Slices;