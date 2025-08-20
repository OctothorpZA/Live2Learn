import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Product schema. Defines the structure for products in the E-Shop.
 */

export const product = defineType({
  name: 'product',
  title: 'Product',
  icon: PackageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // This is the new slug field, required for creating unique URLs
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'productName', // Automatically generates from the product name
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: ['Physical', 'Digital'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'digitalFile',
      title: 'Digital File',
      description: 'Upload the file for digital products.',
      type: 'file',
      hidden: ({document}) => document?.productType !== 'Digital',
    }),
    defineField({
      name: 'stockLevel',
      title: 'Stock Level',
      description: 'Number of items in stock for physical products.',
      type: 'number',
      hidden: ({document}) => document?.productType !== 'Physical',
      validation: (rule) => rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'productType',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: `Type: ${subtitle}`,
        media: media || PackageIcon,
      }
    },
  },
})
