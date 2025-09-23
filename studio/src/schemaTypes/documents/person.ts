import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // **Crucial Fix**: Add the slug field, generated from the person's name
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    // **Crucial Fix**: Renamed 'title' to 'role' to match frontend components
    defineField({
      name: 'role',
      title: 'Role/Position',
      description: 'e.g., Executive Director, Literacy Facilitator, Board Member, Program Coordinator',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      description: 'Brief bio highlighting expertise in literacy education, experience with LTL, or educational background',
      type: 'blockContent',
    }),
    defineField({
      name: 'yearsWithLTL',
      title: 'Years with LTL',
      description: 'How many years this person has been with Living Through Learning',
      type: 'number',
      validation: (rule) => rule.min(0).max(50),
    }),
    defineField({
      name: 'specialty',
      title: 'Area of Specialty',
      description: 'e.g., Foundation Phase Literacy, Teacher Training, Reading Intervention, Gattegno Method',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Order in which team members should appear (lower numbers first)',
      type: 'number',
      initialValue: 999,
    }),
    // **Crucial Fix**: Renamed 'picture' to 'image' to match frontend components
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title,
        subtitle: subtitle,
        media: media || UserIcon,
      }
    },
  },
})
