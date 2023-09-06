import { useEffect } from 'react'
import styled from 'styled-components';

const Container = styled.div``


const Caption = styled.div`
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin: var(--margin) 0;
`


export default function Component({ data, id }) {
    let videoId = data.videoID;

    let regExp = /[a-zA-Z]/g;

    let isYoutube = regExp.test(videoId);

    // fetch(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`)
    // .then((res) => res.json())
    // .then(data => {
    //     setHeight(data.height);
    //     setWidth(data.width)
    // }) 
    
    return (
        <Container>
            <div class="plyr__video-embed player" id={id}>
                <iframe
                src={
                isYoutube ?
                `https://youtube.com/embed/${videoId}`
                :
                `https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
                }
                allowfullscreen
                allowtransparency
                allow="autoplay"
                ></iframe>
            </div>            
            {(data.caption) && <Caption className="caption">{data.caption}</Caption>}
        </Container>
    )
}
