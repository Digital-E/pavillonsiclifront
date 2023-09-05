import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"


const Container = styled.div`
    margin: 200px 15px;
    box-sizing: border-box;

    @media(max-width: 989px) {
        margin: 160px 15px;
    }
`;

const Title = styled.p`
    margin: 0 0 20px 0;
`


const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            <div>
                <Title className='body-large'>Sign up to our Newsletter</Title>
                <EmailSubscribeForm data={data}/>
            </div>
        </Container>
    )
}

export default EmailSubscribe

