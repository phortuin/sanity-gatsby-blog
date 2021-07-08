module.exports = `
    type Localization {
      _type: String
      en: String
      nl: String
    }

    type Current {
      current: String
    }

    type Slug {
       _type: String
       en: Current
       nl: Current
    }

    type SanityPost implements Node {
      title: Localization
      slugLocale: Slug
      koptekst: Localization
      beschrijving: Localization
    }
  `
