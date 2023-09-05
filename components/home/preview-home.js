import { usePreview } from '../../lib/sanity'

import Home from './home'


export default function Component ({ data, query }) {

    const previewData = usePreview(null, query);

    return <Home data={previewData ?? data} preview />
}

