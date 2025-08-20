import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

// First, we define and EXPORT the schema for an individual solution item
export const solutionItem = defineType({
  name: 'solutionItem',
  title: 'Solution Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Upload a small icon for this solution.',
    }),
  ],
})

// Now, we define the main Solution Section schema
export const solution = defineType({
  name: 'solution',
  title: 'Solution Section',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'How We Help',
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      description: 'Add up to three solutions to display in columns.',
      of: [{type: 'solutionItem'}],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      solutions: 'solutions',
    },
    prepare({title, solutions}) {
      const solutionCount = solutions ? solutions.length : 0
      return {
        title: title || 'Solution Section',
        subtitle: `${solutionCount} solution(s)`,
        media: StackCompactIcon,
      }
    },
  },
})
