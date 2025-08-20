import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const teamGrid = defineType({
  name: 'teamGrid',
  title: 'Team Member Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The headline for the team section (e.g., "Meet Our Team").',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      description: 'A short introductory paragraph about the team.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({title}) {
      return {
        title: title || 'Team Member Grid',
        subtitle: 'A grid of team members',
        media: UsersIcon,
      }
    },
  },
})
