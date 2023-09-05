import styled from 'styled-components'

import Body from '../body'

// Slices
import Spacer from './spacer'
import ImageGallery from './image-gallery'
import Text from './text'
import ImageAndText from './image-and-text'
import PortraitGallery from './portrait-gallery'
import LinkList from './link-list'
import EmailSubscribe from '../email-subscribe'
import AnchorTitle from './anchor-title'
import CTA from './cta'
import RequestATokenForm from './request-a-token-form'
import Map from './map'

const Container = styled.div`
`

const SliceWrapper = styled.div`
`

let renderSlice = (slice, index) => {
    
    switch(slice._type) {
        case 'spacer':
        return <SliceWrapper key={slice._id}><Spacer data={slice} /></SliceWrapper>        
        case 'imageGallery':
        return <SliceWrapper key={slice._id}><ImageGallery data={slice} /></SliceWrapper>
        case 'textSlice':
        return <SliceWrapper key={slice._id}><Text data={slice} /></SliceWrapper>
        case 'imageAndText':
        return <SliceWrapper key={slice._id}><ImageAndText data={slice} /></SliceWrapper>
        case 'portraitGallery':
        return <SliceWrapper key={slice._id}><PortraitGallery data={slice} /></SliceWrapper>
        case 'linkList':
        return <SliceWrapper key={slice._id}><LinkList data={slice} /></SliceWrapper>
        case 'emailSubscription':
        return <SliceWrapper key={slice._id}><EmailSubscribe /></SliceWrapper>    
        case 'anchorTitle':
        return <SliceWrapper key={slice._id}><AnchorTitle data={slice} /></SliceWrapper>   
        case 'cta':
        return <SliceWrapper key={slice._id}><CTA data={slice} /></SliceWrapper>
        case 'requestATokenForm':
        return <SliceWrapper key={slice._id}><RequestATokenForm data={slice} /></SliceWrapper>
        case 'map':
        return <SliceWrapper key={slice._id}><Map data={slice} /></SliceWrapper>                              
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