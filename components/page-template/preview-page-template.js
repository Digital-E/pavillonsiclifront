import { usePreview } from '../../lib/sanity'

import PageTemplate from './page-template'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <PageTemplate data={previewData ?? data} preview footerData={footerData} />
}

