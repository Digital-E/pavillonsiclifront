import { usePreview } from '../../lib/sanity'

import PageGrid from './page-grid'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <PageGrid data={previewData ?? data} preview footerData={footerData} />
}

