import { usePreview } from '../../lib/sanity'

import NousSoutenir from './nous-soutenir'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <NousSoutenir data={previewData ?? data} preview footerData={footerData} />
}

