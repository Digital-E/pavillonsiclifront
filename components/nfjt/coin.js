import { useEffect, useRef } from 'react'
import styled from 'styled-components'


const Container = styled.div`
    position: relative;
    top: 0;
    left: 0;
    height: 250px;
    width: 250px;
    perspective: 1000px;
    cursor: pointer;
    z-index: 998;


    > div {
        transition: transform 0.5s;
        transform-style: preserve-3d;
    }

    :hover > div {
        transform: rotateY(180deg);
    }

    @media(max-width: 989px) {
        height: 160px;
        width: 160px;
    }

    img {
        height: 100%;
        width: 100%;
    }
`

const ContainerInner = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    > div {
        backface-visibility: hidden;
    }
`


const Front = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    transform: rotateX(0deg)
`

const Back = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: rotateY(180deg);
`

export default function Component ({ data }) {
    let coinRef = useRef()
    let position = {
        x: 0,
        y: 0
    }
    let velocity = {
        x: 2,
        y: 2
    }

    let update = () => {
        if(coinRef.current === null) return
        let innerWidth = window.innerWidth - coinRef.current.getBoundingClientRect().width
        let innerHeight = window.innerHeight - coinRef.current.getBoundingClientRect().height

        if ( position.x  > innerWidth || position.x < 0 ) {
            velocity.x = -velocity.x;
        }

        if (position.y  > innerHeight || position.y < 0 ) {
            velocity.y = -velocity.y;
        }    
        
        coinRef.current.style.left = `${position.x}px`
        coinRef.current.style.top = `${position.y}px`

        position.x += velocity.x;
        position.y += velocity.y;
    }

    let animate = () => {
        update();
        requestAnimationFrame(animate)
    }

    let initPosition = () => {
        coinRef.current.style.position = 'relative'
        coinRef.current.style.left = `${0}px`
        coinRef.current.style.top = `${0}px`

        position.x = coinRef.current.getBoundingClientRect().x
        position.y = coinRef.current.getBoundingClientRect().y


        coinRef.current.style.left = `${position.x}px`
        coinRef.current.style.top = `${position.y}px`
        coinRef.current.style.position = 'fixed'
    }

    let initAnimation = () => {
        animate();
        window.removeEventListener('scroll', initAnimation)
        window.removeEventListener('resize', initPosition)
    }

    useEffect(() => {
        return;
        
        setTimeout(() => {
            initPosition();
        }, 100)

        window.addEventListener('resize', initPosition)
        window.addEventListener('scroll', initAnimation)

        return () => {
            window.removeEventListener('resize', initPosition)
            window.removeEventListener('scroll', initAnimation)
            cancelAnimationFrame(animate)
        }
    }, [])

    return (
        <Container ref={coinRef}>
            <ContainerInner>
                <Front><img src='/coin/front.svg'/></Front>
                <Back><img src='/coin/back.svg'/></Back>
            </ContainerInner>
        </Container>
    )
}

