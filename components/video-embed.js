import { useEffect, useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: ${props => props.hasResize ? `${props.width / props.height * props.resizeAmount * props.windowHeight}px` : `100%`};
`


const Caption = styled.div`
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin: var(--margin) 0;
    min-height: 18px;
`


export default function Component({ data, id, hasResize, resizeAmount, isInSlider }) {
    let [height, setHeight] = useState(0);
    let [width, setWidth] = useState(0);
    let [windowHeight, setWindowHeight] = useState(0);

    let videoId = data.videoID;

    let regExp = /[a-zA-Z]/g;

    let isYoutube = regExp.test(videoId);

    useEffect(() => {
        let headerHeight = document.querySelector('header').getBoundingClientRect().height
        setWindowHeight(window.innerHeight - headerHeight)
    }, [])

    if(!isYoutube) {
        fetch(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`)
        .then((res) => res.json())
        .then(data => {
            setHeight(data.height);
            setWidth(data.width);
        })
    } else {
        fetch(`https://youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then((res) => res.json())
        .then(data => {
            setHeight(data.height);
            setWidth(data.width);
        }) 
    }
    
    return (
        <Container height={height} width={width} windowHeight={windowHeight} hasResize={hasResize} resizeAmount={resizeAmount} className='video-embed-container'>
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
            {(data.caption || isInSlider) && <Caption className="caption">{data.caption}</Caption>}
        </Container>
    )
}
