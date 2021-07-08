export const locales = [
  {
    id: 'en',
    title: 'English',
    isDefault: true
  },
  {
    id: 'nl',
    title: 'Nederlands'
  }
]

export const baseLanguage = process.env.LOCALE ? process.env.LOCALE : locales.find(l => l.isDefault)
