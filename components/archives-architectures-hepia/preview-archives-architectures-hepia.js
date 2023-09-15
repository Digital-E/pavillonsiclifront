import { usePreview } from '../../lib/sanity'

import ArchivesArchitecturesHepia from './archives-architectures-hepia'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <ArchivesArchitecturesHepia data={previewData ?? data} preview footerData={footerData} />
}

