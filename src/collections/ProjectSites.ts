import { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { admins } from '../access/admins'

export const ProjectSites: CollectionConfig = {
  slug: 'project-sites',
  admin: {
    useAsTitle: 'siteName',
    defaultColumns: ['siteName', 'status', 'updatedAt'],
    listSearchableFields: ['siteName'],
    group: 'LTL Content',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Site Name (e.g., School Name)',
    },
    {
      name: 'location',
      type: 'point',
      required: true,
      label: 'Location Coordinates [Longitude, Latitude]',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Current Partner', value: 'current' },
        { label: 'Former Partner', value: 'former' },
        { label: 'Prospective Partner', value: 'prospective' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
