import { usePreview } from '../../lib/sanity'

import MediaPage from './media-page'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <MediaPage data={previewData ?? data} preview footerData={footerData} />
}

