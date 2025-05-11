import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

/**
 * Slogan schema object.
 * A component to display a prominent slogan or tagline.
 */

export const slogan = defineType({
  name: 'slogan',
  title: 'Slogan',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Slogan Tekst',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Grootte',
      type: 'string',
      options: {
        list: [
          {title: 'Klein', value: 'small'},
          {title: 'Middel', value: 'medium'},
          {title: 'Groot', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'alignment',
      title: 'Uitlijning',
      type: 'string',
      options: {
        list: [
          {title: 'Links', value: 'left'},
          {title: 'Midden', value: 'center'},
          {title: 'Rechts', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Achtergrondkleur',
      type: 'string',
      options: {
        list: [
          {title: 'Geen', value: 'none'},
          {title: 'Licht', value: 'light'},
          {title: 'Donker', value: 'dark'},
          {title: 'Primair', value: 'primary'},
        ],
      },
      initialValue: 'none',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      size: 'size',
    },
    prepare(selection) {
      const {title, size} = selection
      return {
        title: title || 'Slogan',
        subtitle: `Slogan (${size || 'middel'})`,
      }
    },
  },
})
