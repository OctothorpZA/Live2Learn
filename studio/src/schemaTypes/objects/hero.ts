import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true, // Enables copping and positioning of the image
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call-to-Action',
      type: 'link', // This uses your existing 'link' object schema
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call-to-Action',
      type: 'link', // This also uses your existing 'link' object schema
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Section',
        media: media || ImageIcon,
      }
    },
  },
})
