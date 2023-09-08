import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"


const Container = styled.div`

`;

const Title = styled.p`
    margin: 0 0 calc(var(--margin) / 2) 0;
`


const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            <div>
                <Title className='body-large'>{data?.newsletterLabel}</Title>
                <EmailSubscribeForm data={data}/>
            </div>
        </Container>
    )
}

export default EmailSubscribe

