const homeFields = `
  _id,
  title,
  description,
  slides[]{
    image,
    'videoURL': video.asset->url,
    text,
    link
  },
  introImages,
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

const eventFields = `
  _id,
  referenceTitle,
  title,
  description,
  heroImage,
  vignette,
  info1,
  info2,
  info3,
  info4,
  grey,
  excerpt,
  slides,
  slices,
  dateAndTime,
  endDateAndTime,
  occurences,
  backLink,
  googleCalLink,
  "iCalURL": iCalFile.asset->url,
  "slug": slug.current
`

const nousSoutenirFields = `
  _id,
  referenceTitle,
  title,
  description,
  excerpt,
  slides,
  slices,
  "slug": slug.current
`

const laFondationPavillonSicliFields = `
  _id,
  referenceTitle,
  title,
  description,
  slides,
  textOne,
  textTwo,
  textThree,
  "slug": slug.current
`

const leBatimentFields = `
  _id,
  referenceTitle,
  title,
  description,
  slides,
  textOne,
  textTwo,
  "slug": slug.current
`

const donateursFields = `
  _id,
  referenceTitle,
  title,
  description,
  slides,
  textOne,
  textTwo,
  logos,
  "slug": slug.current
`

const partenairesEtSponsorsFields = `
  _id,
  referenceTitle,
  title,
  description,
  titleOne,
  logosOne,
  titleTwo,
  logosTwo,
  titleThree,
  textOne,
  titleFour,
  textTwo,
  "slug": slug.current
`

const archivesArchitecturesHepiaFields = `
  _id,
  referenceTitle,
  title,
  description,
  excerpt,
  slides,
  slices,
  "slug": slug.current
`

const pageProgrammeFields = `
  _id,
  referenceTitle,
  title,
  description,
  info1,
  info2,
  info3,
  excerpt,
  slides,
  slices,
  gridTitle,
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

const pageTemplateFields = `
  _id,
  referenceTitle,
  title,
  description,
  excerpt,
  slides,
  slices,
  "slug": slug.current
`

const pageGridFields = `
  _id,
  title,
  description,
  tiles,
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
    dateAndTime,
    endDateAndTime,
    grey,
    tags,
    "slug": slug.current,
    vignette,
  },
  "slug": slug.current
`

const archiveFields = `
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
    dateAndTime,
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

const equipeFields = `
  _id,
  title,
  description,
  slides,
  tiles,
  text,
  "slug": slug.current,
  language
`

const contactFields = `
  _id,
  title,
  description,
  textOne,
  textTwo,
  googleMapsEmbed,
  "slug": slug.current
`

const legalFields = `
  _id,
  title,
  description,
  text,
  "slug": slug.current,
  language
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
*[_type == "footer" && language == $language][0] {
  newsletterLabel,
  newsletterConfirmationMessage,
  links,
  socials,
  logos
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

export const allEvents = `
*[_type == "event" || _type == "pageProgramme" && language == $language] {
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

export const archiveSlugsQuery = `
*[_type == "archive"] {
  language,
  "slug": slug.current
}
`

export const archiveBySlugQuery = `
*[_type == "archive" && slug.current == $slug][0] {
  ${archiveFields}
}
`

export const archiveFiltersQuery = `
*[_type == "archiveFilters" && language == $language][0] {
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

export const nousSoutenirSlugsQuery = `
*[_type == "nousSoutenir"] {
  language,
  "slug": slug.current
}
`

export const nousSoutenirBySlugQuery = `
*[_type == "nousSoutenir" && slug.current == $slug][0] {
  ${nousSoutenirFields}
}
`

export const laFondationPavillonSicliSlugsQuery = `
*[_type == "laFondationPavillonSicli"] {
  language,
  "slug": slug.current
}
`

export const laFondationPavillonSicliBySlugQuery = `
*[_type == "laFondationPavillonSicli" && slug.current == $slug][0] {
  ${laFondationPavillonSicliFields}
}
`

export const leBatimentSlugsQuery = `
*[_type == "leBatiment"] {
  language,
  "slug": slug.current
}
`

export const leBatimentBySlugQuery = `
*[_type == "leBatiment" && slug.current == $slug][0] {
  ${leBatimentFields}
}
`

export const donateursSlugsQuery = `
*[_type == "donateurs"] {
  language,
  "slug": slug.current
}
`

export const donateursBySlugQuery = `
*[_type == "donateurs" && slug.current == $slug][0] {
  ${donateursFields}
}
`

export const partenairesEtSponsorsSlugsQuery = `
*[_type == "partenairesEtSponsors"] {
  language,
  "slug": slug.current
}
`

export const partenairesEtSponsorsBySlugQuery = `
*[_type == "partenairesEtSponsors" && slug.current == $slug][0] {
  ${partenairesEtSponsorsFields}
}
`

export const archivesArchitecturesHepiaSlugsQuery = `
*[_type == "archivesArchitecturesHepia"] {
  language,
  "slug": slug.current
}
`

export const archivesArchitecturesHepiaBySlugQuery = `
*[_type == "archivesArchitecturesHepia" && slug.current == $slug][0] {
  ${archivesArchitecturesHepiaFields}
}
`

export const pageProgrammeSlugsQuery = `
*[_type == "pageProgramme"] {
  language,
  "slug": slug.current
}
`

export const pageProgrammeAndPageTemplateAndPageGridSlugsQuery = `
*[_type in ["pageProgramme", "pageTemplate", "pageGrid"]] {
  language,
  "slug": slug.current
}
`

export const pageProgrammeBySlugQuery = `
*[_type == "pageProgramme" && slug.current == $slug][0] {
  _type,
  ${pageProgrammeFields}
}
`

export const pageTemplateBySlugQuery = `
*[_type == "pageTemplate" && slug.current == $slug][0] {
  _type,
  ${pageTemplateFields}
}
`

export const pageGridBySlugQuery = `
*[_type == "pageGrid" && slug.current == $slug][0] {
  _type,
  ${pageGridFields}
}
`

export const pageProgrammeAndPageTemplateAndPageGridBySlugQuery = `
*[_type in ["pageProgramme", "pageTemplate", "pageGrid"] && slug.current == $slug][0] {
  _type,
  ${pageTemplateFields, pageProgrammeFields, pageGridFields}
}
`

export const equipeSlugsQuery = `
*[_type == "equipe"] {
  language,
  "slug": slug.current
}
`

export const equipeBySlugQuery = `
*[_type == "equipe" && slug.current == $slug][0] {
  ${equipeFields}
}
`

export const contactSlugsQuery = `
*[_type == "contact"] {
  language,
  "slug": slug.current
}
`

export const contactBySlugQuery = `
*[_type == "contact" && slug.current == $slug][0] {
  ${contactFields}
}
`

export const legalSlugsQuery = `
*[_type == "legal"] {
  language,
  "slug": slug.current
}
`

export const legalBySlugQuery = `
*[_type == "legal" && slug.current == $slug][0] {
  ${legalFields}
}
`

