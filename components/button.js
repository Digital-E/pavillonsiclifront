import {useRef} from 'react'
import styled from 'styled-components'
import { motion, animate } from 'framer-motion'

const Container = styled(motion.div)`
    margin: 30px auto;
    padding: ${props => props.alt ? '15px 10px' : '15px 75px'};
    width: fit-content;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    font-size: 0.875rem;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
`

let transition = {type: "spring", stiffness: 300, duration: 0.3}

export default function Component({ children, alt }) {
    let containerRef = useRef()

    let clicked = () => {

        animate(containerRef.current, {scale: 1.1}, transition)

        setTimeout(() => {
            if(containerRef.current) {
                animate(containerRef.current, {scale: 1.05}, transition)
            }
        }, 50)
    }

    return (
        <Container 
            ref={containerRef}
            alt={alt}
            transition={transition}
            whileHover={{ scale: 1.05 }}
            whileTap={{scale: 1.1 }}
            onClick={() => clicked()}
        >
            {children}
        </Container>
    )
}