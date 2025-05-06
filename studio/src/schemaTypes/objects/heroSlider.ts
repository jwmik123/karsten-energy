import {defineField, defineType} from 'sanity'

export const heroSlider = defineType({
  name: 'heroSlider',
  title: 'Hero Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{type: 'heroSlide'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'slideDuration',
      title: 'Slide Duration (seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(2).max(10),
    }),
  ],
  preview: {
    select: {
      slides: 'slides',
    },
    prepare({slides}) {
      return {
        title: `Hero Slider (${slides?.length || 0} slides)`,
      }
    },
  },
})
