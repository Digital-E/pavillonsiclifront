import { usePreview } from '../../lib/sanity'

import Project from './project'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Project data={previewData ?? data} preview footerData={footerData} />
}

