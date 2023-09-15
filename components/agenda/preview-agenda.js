import { usePreview } from '../../lib/sanity'

import Agenda from './agenda'


export default function Component ({ data, isDark, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Agenda data={previewData ?? data} isDark={isDark} preview footerData={footerData} />
}

