import { usePreview } from '../../lib/sanity'

import RencontreDeLurbanisme from './rencontre-de-l-urbanisme'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <RencontreDeLurbanisme data={previewData ?? data} preview footerData={footerData} />
}

