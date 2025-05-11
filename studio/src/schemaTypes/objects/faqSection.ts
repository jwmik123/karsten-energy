import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Sectie',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sectie Titel',
      type: 'string',
      description: 'De titel voor de FAQ sectie',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Vraag',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Antwoord',
              type: 'blockContent',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Naamloze FAQ Sectie',
        subtitle: 'FAQ Sectie',
      }
    },
  },
})
