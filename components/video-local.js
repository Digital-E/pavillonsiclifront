import { useEffect, useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    video {
        width: 100%
    }
`



export default function Component({ data }) {
    
    return (
        <Container>
            <video autoPlay loop muted>
                <source src={data} type="video/mp4" />
            </video>
        </Container>
    )
}
