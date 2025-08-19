import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Program schema. Defines the structure for LTL's educational programs.
 */

export const program = defineType({
  name: 'program',
  title: 'Program',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'programName',
      title: 'Program Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      description: 'e.g., Grade R-2 Learners, Foundation Phase Educators',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Ongoing', 'Upcoming', 'Past'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'programName',
      subtitle: 'status',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: `Status: ${subtitle}`,
        media: BookIcon,
      }
    },
  },
})
