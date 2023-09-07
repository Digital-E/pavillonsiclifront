import { usePreview } from '../../lib/sanity'

import Media from './media'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Media data={previewData ?? data} preview footerData={footerData} />
}

