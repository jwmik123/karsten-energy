import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const textImageSection = defineType({
  name: 'textImageSection',
  title: 'Tekst & Afbeelding Sectie',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Tekst Inhoud',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Afbeelding Positie',
      type: 'string',
      options: {
        list: [
          {title: 'Links', value: 'left'},
          {title: 'Rechts', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Knop (Optioneel)',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Knoptekst',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Knoplink',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Naamloze Tekst & Afbeelding Sectie',
        subtitle: 'Tekst & Afbeelding Sectie',
        media: media,
      }
    },
  },
})
