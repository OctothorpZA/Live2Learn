import {Suspense} from 'react'

import ResolvedLink from '@/app/components/ResolvedLink'
import {CallToAction} from '@/sanity.types'

type CtaProps = {
  block: CallToAction
  index: number
}

export default function CTA({block}: CtaProps) {
  return (
    <div className="container my-16">
      <div className="bg-gradient-to-br from-ltl-deep-blue via-blue-600 to-purple-700 rounded-3xl max-w-4xl mx-auto shadow-2xl overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-6 right-6 w-20 h-20 bg-hopeful-yellow rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-16 h-16 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="px-8 md:px-16 py-16 flex flex-col md:flex-row items-center gap-8 relative">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {block.heading}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">{block.text}</p>
          </div>

          <Suspense fallback={null}>
            <div className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <ResolvedLink
                link={block.link}
                className="group bg-gradient-to-r from-hopeful-yellow to-orange-400 text-ltl-deep-blue font-bold py-4 px-8 rounded-full hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-2 text-lg"
              >
                <span>{block.buttonText}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </ResolvedLink>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
