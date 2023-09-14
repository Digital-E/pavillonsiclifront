import { usePreview } from '../../lib/sanity'

import Donateurs from './donateurs'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Donateurs data={previewData ?? data} preview footerData={footerData} />
}

