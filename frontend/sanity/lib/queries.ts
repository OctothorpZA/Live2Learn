import { defineQuery, groq } from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "teamGrid" => {
        "teamMembers": @.teamMembers[]->{
          _id,
          name,
          role,
          "image": image.asset->url,
          bio
        }
      }
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Query for the Homepage
export const homePageQuery = groq`
  *[_type == "page" && slug.current == 'home'][0] {
    _id,
    title,
    "slug": slug.current,
    pageBuilder[]{
      ...,
      _key,
      _type,
      _type == 'hero' => { ..., "backgroundImage": backgroundImage.asset->url, primaryCta { ${linkFields} }, secondaryCta { ${linkFields} } },
      _type == 'solution' => { ..., solutions[]{..., "icon": icon.asset->url} },
      _type == 'story' => { ..., person->{name, role, "image": image.asset->url} }
    }
  }
`

// Query for a single Program Page
export const programPageQuery = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    programName,
    "slug": slug.current,
    "coverImage": coverImage.asset->url,
    description,
    status,
    targetAudience,
    keyMetrics[]{
      _key,
      value,
      label
    },
  }
`

// Query to get all program slugs for generateStaticParams
export const programSlugsQuery = groq`
*[_type == "program" && defined(slug.current)][].slug.current
`

// Query to get a list of all programs for the "Our Work" index page
export const allProgramsQuery = groq`
  *[_type == "program" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    programName,
    "slug": slug.current,
    "coverImage": coverImage.asset->url,
    "excerpt": array::join(string::split((pt::text(description[0...1])), "")[0...150], "") + "..."
  }
`
// New query to fetch all team members for the TeamGrid component
export const allTeamMembersQuery = groq`
  *[_type == "person"] | order(name asc) {
    _id,
    name,
    role,
    "image": image.asset->url
  }
`

// ==================================================================
// E-Shop Queries for Sprint 10
// ==================================================================

/**
 * Fetches a list of all products for the gallery page.
 * Includes the productName, slug, image, and price.
 */
export const allProductsQuery = groq`
  *[_type == "product"] {
    _id,
    productName,
    "slug": slug.current,
    "image": image.asset->url,
    price,
  }
`

/**
 * Fetches all details for a single product based on its slug.
 */
export const singleProductQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    productName,
    "slug": slug.current,
    "image": image.asset->url,
    price,
    description,
  }
`
