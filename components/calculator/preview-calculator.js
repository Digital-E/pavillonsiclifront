import { usePreview } from '../../lib/sanity'

import Calculator from './calculator'


export default function Component ({ data, query, footerData }) {

    const previewData = usePreview(null, query);

    return <Calculator data={previewData ?? data} preview footerData={footerData}/>
}

