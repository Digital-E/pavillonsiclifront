import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from './intro-image'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;

    &.close-intro-overlay {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .image-wrapper {
        background: transparent !important;
    }

    .image-wrapper, img {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
    }
`

const DesktopImage = styled.div`
    @media(max-width: 989px) {
        display: none;
    }
`

const MobileImage = styled.div`
    @media(min-width: 990px) {
        display: none;
    }
`


export default function Component({ data }) {
    const containerRef = useRef();

    useEffect(() => {
        let sessionStorage = window.sessionStorage.getItem("pavillonSicliIntro");

        if(sessionStorage) {
            document.querySelector('.home-container').style.opacity = 1
            containerRef.current.style.display = 'none'
        }
    }, [])

    let closeIntroOverlay = () => {
        if(!containerRef.current) return
        containerRef.current.classList.add('close-intro-overlay')
        setTimeout(() => {
            if(!containerRef.current) return
            containerRef.current.style.display = 'none'
        }, 350)
        window.sessionStorage.setItem("pavillonSicliIntro", "true");
    }

    let hasLoaded = () => {
        setTimeout(() => {
            document.querySelector('.home-container').style.opacity = 1

            setTimeout(() => {
                closeIntroOverlay()
            }, 4000)
        }, 0)
    }

    return (
        <Container ref={containerRef} onClick={() => closeIntroOverlay()} onWheel={() => closeIntroOverlay()}>
            <DesktopImage>
                {data && <Image maxWidth={1600} data={data[Math.floor(Math.random() * (data?.length))].desktopImage} hasLoaded={() => hasLoaded()}/>}
            </DesktopImage>
            <MobileImage>
                {data && <Image maxWidth={800} data={data[Math.floor(Math.random() * (data?.length))].mobileImage} hasLoaded={() => hasLoaded()}/>}
            </MobileImage>
        </Container>
    )
}
