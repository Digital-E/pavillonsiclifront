import { usePreview } from '../../lib/sanity'

import NFJT from './nfjt'


export default function Component ({ data, query, footerData }) {

    const previewData = usePreview(null, query);

    return <NFJT data={previewData ?? data} preview footerData={footerData}/>
}

