import { usePreview } from '../../lib/sanity'

import Equipe from './equipe'


export default function Component ({ data, query }) {

    const previewData = usePreview(null, query);

    return <Equipe data={previewData ?? data} preview />
}

