import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

// Define and EXPORT the schema for an individual metric item
export const metricItem = defineType({
  name: 'metricItem',
  title: 'Metric Item',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The number or value for the metric (e.g., "5,000+").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The label for the metric (e.g., "Learners Reached").',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

// Define the main Impact Section schema
export const impact = defineType({
  name: 'impact',
  title: 'Impact Section',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Our Impact in Numbers',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      description: 'Add the key metrics to display.',
      of: [{type: 'metricItem'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      metrics: 'metrics',
    },
    prepare({title, metrics}) {
      const metricCount = metrics ? metrics.length : 0
      return {
        title: title || 'Impact Section',
        subtitle: `${metricCount} metric(s)`,
        media: ChartUpwardIcon,
      }
    },
  },
})
