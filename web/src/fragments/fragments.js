import {graphql} from 'gatsby'

export const sanityImage = graphql`
  fragment sanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
`

export const postFields = graphql`
  fragment postFields on SanityPost {
    id
    publishedAt
    slug {
      _type
      current
    }
    slugLocale {
      _type
      nl {
        current
      }
      en {
        current
      }
    }
    title {
      _type
      en
      nl
    }
    koptekst {
      _type
      en
      nl
    }
    beschrijving {
      _type
      en
      nl
    }
    mainImage {
      ...sanityImage
      alt
    }
    _rawExcerpt(resolveReferences: {maxDepth: 5})
    _rawBody(resolveReferences: {maxDepth: 5})
  }
`

export const authorFields = graphql`
  fragment authorFields on SanityAuthor {
    image {
      crop {
        _key
        _type
        top
        bottom
        left
        right
      }
      hotspot {
        _key
        _type
        x
        y
        height
        width
      }
      asset {
        _id
      }
    }
    name
  }
`

export const siteSettings = graphql`
  fragment siteSettings on SanitySiteSettings {
    title
    description
    keywords
    author {
      name
    }
  }
`
