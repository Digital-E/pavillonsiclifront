import Alert from './alert'
import Meta from './meta'

import Footer from '../components/footer'

export default function Layout({ preview, children, title, description, ogImage, footerData }) {

  return (
    <>
      <Meta title={title} description={description} ogImage={ogImage} />
      <div>
        <Alert preview={preview} />
        <main>{children}</main>
        {footerData && <Footer data={footerData}/>}
      </div>
    </>
  )
}
