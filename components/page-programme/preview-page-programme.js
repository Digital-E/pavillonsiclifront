import { usePreview } from '../../lib/sanity'

import PageProgramme from './page-programme'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <PageProgramme data={previewData ?? data} preview footerData={footerData} />
}

