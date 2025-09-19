import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const socialMediaIcon = defineType({
  name: 'socialMediaIcon',
  title: 'Social Media Icon',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter/X', value: 'twitter'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'WhatsApp', value: 'whatsapp'},
          {title: 'Email', value: 'email'},
          {title: 'Website', value: 'website'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Full URL to the social media profile or website',
      validation: (rule) => rule.required().uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      }),
    }),
    defineField({
      name: 'customLabel',
      title: 'Custom Label',
      type: 'string',
      description: 'Optional custom label (only used when platform is "Other")',
      hidden: ({parent}) => parent?.platform !== 'other',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.platform === 'other' && !value) {
            return 'Custom label is required when platform is "Other"'
          }
          return true
        }),
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible',
      type: 'boolean',
      description: 'Show this social media link on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      customLabel: 'customLabel',
      url: 'url',
      isVisible: 'isVisible',
    },
    prepare({platform, customLabel, url, isVisible}) {
      const title = platform === 'other' ? customLabel || 'Other Platform' : 
        platform?.charAt(0).toUpperCase() + platform?.slice(1) || 'Unknown Platform'
      
      return {
        title,
        subtitle: `${url || 'No URL'} ${!isVisible ? '(Hidden)' : ''}`,
        media: LinkIcon,
      }
    },
  },
})