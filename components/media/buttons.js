import styled from 'styled-components'
import Button from '../button'

const Container = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;

    div:first-child > button {
        margin: calc(var(--margin) * 2);
    }

    div:nth-child(2) {
        display: flex;
    }

    div:nth-child(2) > button {
        margin: calc(var(--margin) * 2) 0;
    }

    > div {
        flex-basis: 50%;
    }
`

const ColLeft = styled.div``

const ColRight = styled.div``


export default function Component ({ data }) {


    return (
        <Container>
            <ColLeft>
                <Button>Retour page projet</Button>
            </ColLeft>
            <ColRight>
                <Button>Ajouter à Google agenda</Button>
                <Button>Exporter vers I cal</Button>
            </ColRight>
        </Container>
    )
}

