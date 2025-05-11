import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Informatie Sectie',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({title}) {
      return {
        title: title || 'Naamloze Informatie Sectie',
        subtitle: 'Informatie Sectie',
      }
    },
  },
})
