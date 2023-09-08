const homeFields = `
  _id,
  title,
  description,
  slides,
  tiles,
  "slug": slug.current,
  language
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

const eventFields = `
  _id,
  referenceTitle,
  title,
  description,
  date,
  heroImage,
  info1,
  info2,
  info3,
  excerpt,
  slides,
  slices,
  googleCalLink,
  "iCalURL": iCalFile.asset->url,
  "slug": slug.current
`

const agendaFields = `
  _id,
  title,
  description,
  linkPrev,
  linkNext,
  events[]->{
    title,
    info1,
    info2,
    info3,
    info4,
    grey,
    tags,
    "slug": slug.current,
    vignette,
  },
  "slug": slug.current
`

const mediaFields = `
  _id,
  title,
  description,
  linkPrev,
  linkNext,
  media[]->{
    title,
    info1,
    info2,
    info3,
    info4,
    type,
    "slug": slug.current,
    vignette,
  },
  "slug": slug.current
`

const mediaPageFields = `
  _id,
  referenceTitle,
  title,
  description,
  date,
  heroImage,
  info1,
  info2,
  info3,
  excerpt,
  slides,
  slices,
  googleCalLink,
  "iCalURL": iCalFile.asset->url,
  "slug": slug.current
`

const pressFields = `
  _id,
  title,
  description,
  linkPrev,
  linkNext,
  tiles,
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
*[_type == "home" && language == $language][0] {
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
*[_type == "menu" && language == $language][0] {
  links[]{
    linkLabel,
    linkURL,
    subLinks
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

export const eventSlugsQuery = `
*[_type == "event"] {
  language,
  "slug": slug.current
}
`

export const eventBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`

export const agendaSlugsQuery = `
*[_type == "agenda"] {
  language,
  "slug": slug.current
}
`

export const agendaBySlugQuery = `
*[_type == "agenda" && slug.current == $slug][0] {
  ${agendaFields}
}
`

export const agendaFiltersQuery = `
*[_type == "agendaFilters" && language == $language][0] {
  filterCategoryOne,
  filterListOne,
  filterCategoryTwo,
  filterListTwo,
  filterCategoryThree,
  filterListThree
}
`

export const mediaSlugsQuery = `
*[_type == "media"] {
  language,
  "slug": slug.current
}
`

export const mediaBySlugQuery = `
*[_type == "media" && slug.current == $slug][0] {
  ${mediaFields}
}
`

export const mediaPageSlugsQuery = `
*[_type == "mediaPage"] {
  language,
  "slug": slug.current
}
`

export const mediaPageBySlugQuery = `
*[_type == "mediaPage" && slug.current == $slug][0] {
  ${mediaPageFields}
}
`

export const pressSlugsQuery = `
*[_type == "press"] {
  language,
  "slug": slug.current
}
`

export const pressBySlugQuery = `
*[_type == "press" && slug.current == $slug][0] {
  ${pressFields}
}
`

export const pressFiltersQuery = `
*[_type == "pressFilters" && language == $language][0] {
  filterCategoryOne,
  filterListOne
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

