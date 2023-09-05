import styled from 'styled-components'
import Button from '../button'
import Link from '../link'

const Container = styled.div`
    div {
        padding: 15px 10px;
    }

    a {
        opacity: 1;
    }
`

export default function Component({ data }) {
    return (
        <Container>
            <Link href={data.linkPath}><Button>{data.linkLabel}</Button></Link>
        </Container>
    )
}