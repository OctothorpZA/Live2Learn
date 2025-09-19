import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * School Partner schema. Defines the structure for LTL's partner schools.
 */

export const schoolPartner = defineType({
  name: 'schoolPartner',
  title: 'School Partner',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // FIX: Add Latitude field for map coordinates
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'The latitude coordinate of the school. E.g., -33.9249',
      validation: (rule) => rule.required(),
    }),
    // FIX: Add Longitude field for map coordinates
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'The longitude coordinate of the school. E.g., 18.4241',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Current Partner', 'Former (Education Alive NPO)', 'Prospective', 'Head Office'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      description: 'A full address that can be used for mapping.',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'A brief description of the partnership or school.',
      type: 'blockContent',
    }),
    defineField({
      name: 'partnershipYear',
      title: 'Partnership Start Year',
      type: 'number',
      validation: (rule) =>
        rule.integer().min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'photo',
      title: 'Photo of School',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'schoolName',
      subtitle: 'status',
      media: 'photo',
    },
  },
})
