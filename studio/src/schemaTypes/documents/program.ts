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
    // **Crucial Fix**: Add the slug field
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'programName',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string', title: 'Value (e.g., 50+)'},
            {name: 'label', type: 'string', title: 'Label (e.g., Schools Reached)'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'programName',
      subtitle: 'status',
      media: 'coverImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: `Status: ${subtitle}`,
        media: media || BookIcon,
      }
    },
  },
})
