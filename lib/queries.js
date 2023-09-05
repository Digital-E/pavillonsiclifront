const homeFields = `
  _id,
  title,
  description,
  "ogImage": ogImage.asset->url,
  slides[] {
    'asset': asset -> url
  },
  slices,
  formOneText,
  formTwoTitle,
  formTwoText,
  signUpConfirmationText,
  toolkitConfirmationText,
  subscribeConfirmationText,
  signatoryListTitle,
  signatoryList,
  "slug": slug.current
`

const aboutFields = `
  _id,
  title,
  description,
  slices,
  "slug": slug.current
`

const nfjtFields = `
  _id,
  title,
  description,
  authors,
  slices,
  "slug": slug.current
`

const projectFields = `
  _id,
  title,
  description,
  date,
  logo,
  heroImage,
  slices,
  "slug": slug.current
`

const calculatorFields = `
  _id,
  title,
  description,
  sentenceOne,
  sentenceTwo,
  sentenceThree,
  sentenceFour,
  "backgroundVideo": backgroundVideo.asset -> url,
  questions,
  "slug": slug.current
`

const legalFields = `
  _id,
  title,
  description,
  text,
  "slug": slug.current
`

export const homeQuery = `
*[_type == "home"][0] {
  ${homeFields}
}
`

export const aboutQuery = `
*[_type == "about"][0] {
  ${aboutFields}
}
`

export const nfjtQuery = `
*[_type == "nfjt"][0] {
  ${nfjtFields}
}
`

export const menuQuery = `
*[_type == "menu"][0] {
  links[]{
    linkLabel,
    linkURL,
    subLinks[]->{
      title,
      "slug": slug.current,
      heroImage,
    }
  }
}
`

export const footerQuery = `
*[_type == "footer" && !(_id in path("drafts.**"))][0] {
  links
}
`

export const privacyPolicyQuery = `
*[_type == "privacyPolicy"][0] {
    ${legalFields}
}
`

export const allDocumentsSlugsQuery = `
*[slug.current == $slug][0] {
  _type,
  "slug": slug.current
}
`

export const projectSlugsQuery = `
*[_type == "project" && defined(slug.current)][].slug.current
`

export const projectBySlugQuery = `
*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}
`

export const legalSlugsQuery = `
*[_type == "legal" && defined(slug.current)][].slug.current
`

export const legalBySlugQuery = `
*[_type == "legal" && slug.current == $slug][0] {
  ${legalFields}
}
`

export const calculatorQuery = `
*[_type == "calculator"][0] {
  ${calculatorFields}
}
`

