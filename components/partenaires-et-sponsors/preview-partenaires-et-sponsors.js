import { usePreview } from '../../lib/sanity'

import PartenairesEtSponsors from './partenaires-et-sponsors'


export default function Component ({ data, query, footerData }) {
    const slug = data?.post?.slug
    const previewData = usePreview(null, query, { slug });

    return <PartenairesEtSponsors data={previewData ?? data} preview footerData={footerData} />
}

