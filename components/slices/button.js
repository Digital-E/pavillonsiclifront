import styled from 'styled-components'
import Link from '../link'
import Button from '../button'

export default function Component({ data }) {

    return (
        <Link href={data.linkURL}>
            <Button>
                {data.label}
            </Button>
        </Link>
    )
}