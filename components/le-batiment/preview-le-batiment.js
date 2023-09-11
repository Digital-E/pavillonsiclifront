import { usePreview } from '../../lib/sanity'

import LeBatiment from './le-batiment'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <LeBatiment data={previewData ?? data} preview footerData={footerData} />
}

