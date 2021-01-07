import {locales} from '../../config/locales'

export default {
  name: 'localeSlug',
  type: 'object',
  title: 'translatable slug',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: locales.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    options: {
      source: `title.${lang.id}`,
      maxLength: 96
    }
  }))
}
