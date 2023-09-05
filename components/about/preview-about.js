import { usePreview } from '../../lib/sanity'

import About from './about'


export default function Component ({ data, query, footerData }) {

    const previewData = usePreview(null, query);

    return <About data={previewData ?? data} preview footerData={footerData}/>
}

