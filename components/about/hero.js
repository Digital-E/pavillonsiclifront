import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    margin: 64px 0 40px 0;

    img {
        width: 100%;
    }

    @media(max-width: 989px) {
        margin: 64px 0 20px 0;
    }
`


export default function Component ({ data }) {


    return (
        <Container>
            <img src='./logo/logo.svg' />
        </Container>
    )
}

