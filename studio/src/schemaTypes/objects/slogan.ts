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
      title: 'Slogan Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Primary', value: 'primary'},
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
        subtitle: `Slogan (${size || 'medium'})`,
      }
    },
  },
})
