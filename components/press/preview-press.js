import { usePreview } from '../../lib/sanity'

import Press from './press'


export default function Component ({ data, filters, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Press data={previewData ?? data} filters={filters} preview footerData={footerData} />
}

