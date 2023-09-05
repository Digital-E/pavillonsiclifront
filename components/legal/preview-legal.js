import { usePreview } from '../../lib/sanity'

import Legal from './legal'


export default function Component ({ data, query, footerData }) {
    const slug = data?.legal?.slug
    const previewData = usePreview(null, query, { slug });

    return <Legal data={previewData ?? data} preview footerData={footerData} />
}

