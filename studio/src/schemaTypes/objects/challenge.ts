import {defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons' // Using a different icon for variety

export const challenge = defineType({
  name: 'challenge',
  title: 'Challenge Section',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'statistic',
      title: 'Statistic',
      type: 'string',
      description: 'The large, impactful number or percentage (e.g., "81%").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief explanation of what the statistic means.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'statistic',
      subtitle: 'description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Challenge Section',
        subtitle: subtitle || 'Displays a key statistic.',
        media: ThLargeIcon,
      }
    },
  },
})
