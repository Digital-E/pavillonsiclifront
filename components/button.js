import {useRef} from 'react'
import styled from 'styled-components'
import { motion, animate } from 'framer-motion'

const Container = styled(motion.button)``

let transition = {type: "spring", stiffness: 300, duration: 0.3}

export default function Component({ children }) {
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
            transition={transition}
            whileHover={{ scale: 1.05 }}
            whileTap={{scale: 1.1 }}
            onClick={() => clicked()}
        >
            {children}
        </Container>
    )
}