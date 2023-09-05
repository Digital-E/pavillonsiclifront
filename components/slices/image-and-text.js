import styled from 'styled-components'
import Image from '../image'
import Body from '../body'

const Container = styled.div`
    margin: 0 15px;
`

const InnerContainer = styled.div`
    display: flex;
    justify-content: ${props => props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : 'center'};

    > div {
        flex-basis: ${props => props.fullWidth ? '50%' : '33.3333%'};
    }

    > div:first-child {
        flex-basis: ${props => props.align === 'center' ? 'calc(16.6666% - 25px)' : props => props.fullWidth ? '50%' : '33.3333%'};
    }

    > div:last-child {
        flex-basis: ${props => props.align === 'center' ? '50%' : props => props.fullWidth ? '50%' : '33.3333%'};
        order: ${props => props.align === 'right' && props.fullWidth ? '-1' : '1'}
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div:last-child {
            order: 1
        }
    }
`

const ColLeft = styled.div`
    display: flex;
    justify-content: center;

    > div {
        width: ${props => props.align === 'center' ? '100%' : props.fullWidth ? '55%' : '100%'}
    }
`

const ColRight = styled.div`

    > div {
        margin-left: 30px;
    }

    a {
        opacity: 0.6;
    }

    a:hover {
        opacity: 1 !important;
    }

    @media(max-width: 989px) {
        margin-top: ${props => props.fullWidth ? '60px' : '30px'};

        > div {
            margin-left: 0;
        }
    }
`

export default function Component({ data }) {

    return (
        <Container fullWidth={data.fullWidth}>
            <InnerContainer align={data.align} fullWidth={data.fullWidth}>
                <ColLeft fullWidth={data.fullWidth} align={data.align}>
                    <Image data={data.image} />
                </ColLeft>
                <ColRight fullWidth={data.fullWidth}>
                    <Body content={data.text} />
                </ColRight>
            </InnerContainer>
        </Container>
    )
}