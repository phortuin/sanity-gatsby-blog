export const createLocaleTextGetter = (languageCode) => {
  const languages = [languageCode, process.env.LOCALE]
  const localize = (value) => {
    if (Array.isArray(value)) {
      return value.map((v) => localize(v, languages))
    } else if (typeof value === 'object') {
      if (value) {
        if (/^locale[A-Z]/.test(value._type)) {
          const language = languages.find((lang) => value[lang])
          return value[language]
        }
        return Object.keys(value).reduce((result, key) => {
          result[key] = localize(value[key], languages)
          return result
        }, {})
      }
      return value
    }
    return value
  }
  return localize
}
