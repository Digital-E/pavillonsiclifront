import styled from 'styled-components'

import Image from '../../image'
import Body from '../../body'

import { sanityConfig } from '../../../lib/config'
import { getImage } from '@sanity/asset-utils'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-basis: calc(50% - 20px);
    padding: 30px 20px 20px 0;

    > div {
        flex-basis: 50%;
    }
`

const ColLeft = styled.div`
    padding: 0 20px;

    img {
        width: 100%;
    }
`

const ColRight = styled.div`
    padding: 0;
`


const Text = styled.div`
    color: black;
    font-family: 'Standard';
    font-size: 10px;
    margin-bottom: 5px;

    * {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        margin: 0;
    }
`


export default function Component ({ data = {} }) {
    let imageUrl = null

    if(data.image !== undefined) {
        imageUrl = `${getImage(data.image, sanityConfig).asset.url}?w=400`
    }

    return (
        <Container>
            <ColLeft>
                <img src={imageUrl} />
                {/* <Image 
                    data={data.image} 
                /> */}
            </ColLeft>
            <ColRight>
                <Text>
                    <Body content={data.textOne} />
                </Text>  
                <Text>
                    <Body content={data.textTwo} />
                </Text>  
                <Text>
                    <Body content={data.textThree} />
                </Text>  
            </ColRight>                      
        </Container>
    )
}

