import { usePreview } from '../../lib/sanity'

import Event from './event'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Event data={previewData ?? data} preview footerData={footerData} />
}

