import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../button'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const Container = styled.div`
    position: fixed;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;

    > div > div {
        width: 210px;
        box-sizing: border-box;
        padding: 15px 0;
        margin: 0 5px;
        text-align: center;
        background: rgb(0 0 0 / 20%);
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            margin: 5px 0;
        }
    }
`


export default function Component ({ data = {} }) {
    let [shareLink, setShareLink] = useState('')
    let [hasCopied, setHasCopied] = useState(false)

    let copied = () => {
        setHasCopied(true)
    }

    useEffect(() => {
        setShareLink(`${window.location.href}`)
    }, [])

    let downloadPdf = () => {
        window.scrollTo(0, 0)

        var element = document.querySelector('.results-container');
        let opt = {
            // image: {type: 'jpeg', quality: 0.95},
            filename: 'Your Carbon Calculator Results.pdf',
            margin: 10,
            html2canvas: { allowTaint: false, useCORS: true, scrollX:0 , scrollY: 0 },
        }

        html2pdf().set(opt).from(element).save();
    }

    return (
        <Container>
                <CopyToClipboard text={shareLink} onCopy={() => copied()}>
                    <div>
                        <Button>{hasCopied ? 'Link Copied!' : 'Share'}</Button>
                    </div>
                </CopyToClipboard>
                <div onClick={() => downloadPdf()}><Button>Download</Button></div>   
        </Container>
    )
}

