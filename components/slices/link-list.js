import styled from 'styled-components'

const Container = styled.div`
    box-sizing: border-box;
    margin: 30px 15px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.center ? 'center' : 'left'};
    width: 100%;

    a {
        opacity: 1;
        line-height: 1.6;
        border-bottom: ${props => props.underline ? '1px solid rgba(255, 255, 255, 0.6)' : ''};
        width: fit-content;
    }

    > p {
        flex-basis: ${props => props.columns === '6' ? '16.666%' : '25%'};
        text-align: ${props => props.center ? 'center' : 'left'};
    }

    @media(max-width: 989px) {
        > p {
            flex-basis: ${props => props.columns === '6' ? '50%' : '100%'};
        }
    }
`

const Title = styled.p`
    margin-bottom: 40px;
`


const Link = styled.p`

    a {
        max-width: 200px;
    }

    @media(max-width: 989px) {
        margin-bottom: ${props => props.columns === '6' ? '40px' : 'initial'};
    }
`



export default function Component({ data }) {

    return (
        <Container>
            <Title className='body-large'>{data.title}</Title>
            <InnerContainer columns={data.columns} center={data.center} underline={data.underline}>
                {data.links?.map((item, index) => 
                        <Link columns={data.columns}><a href={item?.link} target='_blank'>{item?.linkLabel}</a></Link>
                )}
            </InnerContainer>
        </Container>
    )
}