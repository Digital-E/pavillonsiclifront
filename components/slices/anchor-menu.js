import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Container = styled.div`
    position: fixed;
    display: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--header-width);
    z-index: 998;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(40px);
    transition: bottom 0.3s;

    &.hide {
        bottom: -100px;
    }

    @media(max-width: 989px) {
        left: 0;
        width: 100vw;
        transform: none;
        overflow: scroll;
    }
`
const InnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Element = styled.div`
    position: relative;
    padding: 15px 30px;
    cursor: pointer;

    &.is-active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 1);
        height: 2px;
        width: 100%;
    }

    a {
        opacity: 1;
        white-space: nowrap;
        font-size: 0.875rem;
    }
`


export default function Component({ data }) {

    let [menuElements, setMenuElements] = useState([])
    let prevAnchorIndex = 0;

    useEffect(() => {
        // Set Up Scroll To
        
        let anchorMenuElements = data.slices

        anchorMenuElements = data.slices?.filter(item => item._type === 'anchorTitle')

        setMenuElements(anchorMenuElements)

        // Automatic Section Highlight

        let slices = document.querySelectorAll('.anchor-title')
    
        function isSliceElementInViewport(el) {
    
            var rect = el.getBoundingClientRect();
    
            return (
                rect.top <= window.innerHeight / 2
            );
        }
        
        var handler = () => {

        let allMenuItems = document.querySelectorAll('.anchor-menu-item')

        if(window.scrollY >= (document.body.offsetHeight - 10) - window.innerHeight) {
            allMenuItems.forEach(itemTwo => {
                itemTwo.classList.remove('is-active')
            })

            document.querySelector('.anchor-menu').classList.add('hide')

            return allMenuItems[allMenuItems.length - 1]?.classList.add('is-active')
        }

        document.querySelector('.anchor-menu')?.classList.remove('hide')

        allMenuItems.forEach((item, index) => {
            if(item.classList.contains('is-active') && index !== prevAnchorIndex) {
                gsap.to('.anchor-menu', {duration: 1, ease: 'power3.inOut', scrollTo: {x: item.getBoundingClientRect().x}});
                prevAnchorIndex = index
            }
        })

        slices.forEach((itemOne) => {
            let isInViewport = isSliceElementInViewport(itemOne);

            if(isInViewport) {
                allMenuItems.forEach((itemTwo, indexTwo) => {
                    itemTwo.classList.remove('is-active')
                    
                    if(itemOne.getAttribute('data-anchor') === itemTwo.getAttribute('data-anchor')) {
                        itemTwo.classList.add('is-active')
                    }
                })
            }
        })
        }        

        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', handler, false);
            addEventListener('load', handler, false);
            addEventListener('scroll', handler, false);
            addEventListener('resize', handler, false);
        } else if (window.attachEvent)  {
            attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
            attachEvent('onload', handler);
            attachEvent('onscroll', handler);
            attachEvent('onresize', handler);
        }   
        
        // // Fix Safari Backdrop Filter Bug

        setTimeout(() => {
            document.querySelector('.anchor-menu').style.display = 'block'
        }, 100)

        return () => {
            window.removeEventListener('DOMContentLoaded', handler);
            window.removeEventListener('load', handler);
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        }
    }, []);

    let scrollTo = (id) => {
        gsap.to(window, {duration: 1, ease: 'power3.inOut', scrollTo: {y:`#slice-${id}`, offsetY: 100}});
    }

    return (
        <Container className='anchor-menu'>
            <InnerContainer>
                {menuElements?.map(item => <Element data-anchor={item.slug.current} id={item.slug.current} className='anchor-menu-item' onClick={() => scrollTo(item.slug.current)}><a>{item.menuTitle}</a></Element>)}
            </InnerContainer>
        </Container>
    )
}