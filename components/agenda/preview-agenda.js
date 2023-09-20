import { usePreview } from '../../lib/sanity'

import Agenda from './agenda'


export default function Component ({ data, filters, isDark, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <Agenda data={previewData ?? data} filters={filters} isDark={isDark} preview footerData={footerData} />
}

