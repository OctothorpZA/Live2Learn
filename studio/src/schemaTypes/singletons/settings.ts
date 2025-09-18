import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Settings schema Singleton. This schema is used for site-wide settings
 * and is configured to only have one instance in the Sanity Studio.
 */
export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      description:
        'Add links to your social media profiles. These will appear in the site footer.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              description: 'e.g., Facebook, LinkedIn, Twitter',
              type: 'string',
              // THIS IS THE FIX:
              // By changing this to a dropdown list, we ensure the data is always clean and predictable.
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  // Add other platforms here in the future
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'The full URL to the profile.',
              type: 'url',
              validation: (rule) =>
                rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
        },
      ],
    }),
    // We can add other global settings here in the future (e.g., contact email, address).
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})

