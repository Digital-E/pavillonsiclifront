import { useRef } from 'react'
import { createClient } from '@sanity/client';
import { sanityConfig } from "../lib/config"
import { useNextSanityImage } from 'next-sanity-image';
import Img from 'next/image';

import styled from 'styled-components';

const ImageWrapper = styled.div`
    position: relative;
    height: fit-content;
    background: rgba(255,255,255,0.2);
    margin: 0;
    padding: 0;
    opacity: 1;

    > img.hide-image {
        opacity: 0;
    }

    > img {
        display: block;
        transition: opacity 0.3s;
    }
`

const Caption = styled.div`
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin: var(--margin) 0;
`


const Image = ({ data }) => {
    let imageRef = useRef();

    if(data === null || data === undefined) return null;

    const configuredSanityClient = createClient(sanityConfig);

    const imageProps = useNextSanityImage(
        configuredSanityClient,
        data.asset
    );

    let revealImage = () => {
        imageRef.current.classList.remove('hide-image')
    }

    return (
        <ImageWrapper>
            <Img 
                ref={imageRef}
                onLoad={() => revealImage()}
                className='hide-image'
                {...imageProps} 
                style={{ width: '100%', height: 'auto' }}
                alt={data.caption} 
                sizes="(max-width: 800px) 100vw, 800px" 
                />
            {
                (data.caption) && 
                <>
                    <Caption className="caption">{data.caption}</Caption>
                </>
            }
        </ImageWrapper>
    )
}

export default Image;