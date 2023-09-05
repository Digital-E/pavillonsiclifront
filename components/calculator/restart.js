import { useEffect, useRef, useContext } from 'react'
import { store } from '../../store'

import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    height: 50px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.01);
    backdrop-filter: blur(40px);
    box-sizing: border-box;
    cursor: pointer;

    p {
        margin: 0;
        margin-left: 10px;
    }

    @media(max-width: 989px) {
        display: flex;
        justify-content: center;
        top: auto;
        bottom: 0;
        width: 215px;
        z-index: 999;
        left: 50%;
        transform: translateX(-50%);
    }
`

export default function Component ({ }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let restart = () => {
        let items = JSON.parse(JSON.stringify(state.questions))

        items.forEach(item => {
            item.isOpen = false
            item.selectedIndex = null
            item.hasAnswered = false
        })

        dispatch({type: 'update questions', value: items})
    }

    return (
        <Container onClick={() => restart()}>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
        <g filter="url(#filter0_b_471_3373)">
        <path d="M12.942 5.54167C13.2182 5.54119 13.4416 5.31695 13.4411 5.0408L13.4334 0.540811C13.4329 0.264669 13.2087 0.0411975 12.9325 0.0416739C12.6564 0.0421503 12.4329 0.266394 12.4334 0.542536L12.4403 4.54253L8.44029 4.54943C8.16415 4.54991 7.94068 4.77415 7.94115 5.05029C7.94163 5.32643 8.16587 5.5499 8.44202 5.54943L12.942 5.54167ZM14.5 10C14.5 13.5899 11.5899 16.5 8 16.5V17.5C12.1421 17.5 15.5 14.1421 15.5 10H14.5ZM8 16.5C4.41015 16.5 1.5 13.5899 1.5 10H0.5C0.5 14.1421 3.85786 17.5 8 17.5V16.5ZM1.5 10C1.5 6.41015 4.41015 3.5 8 3.5V2.5C3.85786 2.5 0.5 5.85786 0.5 10H1.5ZM8 3.5C9.79101 3.5 11.412 4.22371 12.5882 5.39583L13.2941 4.6875C11.9381 3.33622 10.0662 2.5 8 2.5V3.5Z" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_b_471_3373" x="-19.5" y="-19.9583" width="55" height="57.4583" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_471_3373"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_471_3373" result="shape"/>
        </filter>
        </defs>
        </svg>            
            <p className='body-small'>Start again</p>
        </Container>
    )
}

