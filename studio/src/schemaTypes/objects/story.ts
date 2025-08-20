import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const story = defineType({
  name: 'story',
  title: 'Story/Testimonial Section',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'A Story of Change',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'The main testimonial text.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      description: 'Link to the person who gave the testimonial.',
      to: [{type: 'person'}], // This creates a reference to your existing 'person' schema
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      personName: 'person.name',
    },
    prepare({title, personName}) {
      return {
        title: title || 'Story Section',
        subtitle: personName ? `By ${personName}` : 'A testimonial.',
        media: CommentIcon,
      }
    },
  },
})
