import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Afbeelding',
      type: 'image',
      description: 'Een volledige breedte header afbeelding weergegeven op 100% viewport hoogte',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'string',
    }),
    defineField({
      name: 'headerListItems',
      title: 'Header Lijst Items',
      type: 'array',
      description: 'Lijst items om weer te geven in de header overlay',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'headerButton',
      title: 'Header Knop',
      type: 'object',
      description: 'Knop om weer te geven in de header overlay',
      fields: [
        {
          name: 'text',
          title: 'Tekst',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'link',
        },
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Pagina bouwer',
      type: 'array',
      of: [
        {type: 'callToAction'},
        {type: 'infoSection'},
        {type: 'faqSection'},
        {type: 'textImageSection'},
        {type: 'slogan'},
      ],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
})
