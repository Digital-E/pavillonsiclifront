import { usePreview } from '../../lib/sanity'

import LaFondationPavillonSicli from './la-fondation-pavillon-sicli'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <LaFondationPavillonSicli data={previewData ?? data} preview footerData={footerData} />
}

