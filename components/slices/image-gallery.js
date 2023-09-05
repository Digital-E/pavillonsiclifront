import styled from 'styled-components'
import Image from '../image'
import Body from '../body'

const Container = styled.div`
    display: flex;
    box-sizing: border-box;

    > div {
        flex-basis: ${props => props.length === 2 ? '50%' : '100%'};
        margin: ${props => props.length === 2 ? '0 15px' : '0'};
    }

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const ImageWrapper = styled.div`
    > div:first-child {
        display: block;
        margin: 0 auto;
        width: ${props => props.alt ? '55%' : '100%'} !important;
    }

    @media(max-width: 989px) {
        > div:first-child {
            margin-bottom: 30px;
        }
    }
`


const Text = styled.div`
    margin-top: 40px;

    p {
        margin-bottom: 60px;
    }
`


export default function Component({ data }) {

    return (
        <Container length={data.images?.length}>
            {data.images?.map((item, index) => (
                <ImageWrapper alt={item.text ? true : false}>
                    <div>
                        <Image data={item.galleryImage} />
                    </div>
                    <Text>
                        <Body content={item.text} />
                    </Text>          
                </ImageWrapper>      
            ))}
        </Container>
    )
}