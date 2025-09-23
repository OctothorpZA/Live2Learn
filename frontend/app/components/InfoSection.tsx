import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
}

export default function InfoSectionComponent({block}: InfoProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {block?.heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-charcoal mb-6">
              {block.heading}
            </h2>
          )}
          {block?.subheading && (
            <p className="text-xl md:text-2xl text-ltl-deep-blue font-medium mb-8">
              {block.subheading}
            </p>
          )}
          <div className="prose prose-lg max-w-none prose-charcoal prose-headings:text-charcoal prose-a:text-ltl-deep-blue prose-strong:text-charcoal">
            {block?.content?.length && (
              <PortableText 
                className="text-base md:text-lg leading-relaxed" 
                value={block.content as PortableTextBlock[]} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
