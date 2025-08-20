import { PortableText } from '@portabletext/react'
import Link from 'next/link'

// Define the types for the props this component will accept
// These should match the structure of the data from our programPageQuery
type Metric = {
  _key: string
  value: string
  label: string
}

type ProgramBodyProps = {
  description?: any[] | null
  status?: string | null
  targetAudience?: string | null
  keyMetrics?: Metric[] | null
}

export default function ProgramBody({
  description,
  status,
  targetAudience,
  keyMetrics,
}: ProgramBodyProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Area (takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold font-heading text-charcoal mb-4">
              About the Program
            </h2>
            <div className="prose prose-lg max-w-none">
              {description ? (
                <PortableText value={description} />
              ) : (
                <p>No program description available.</p>
              )}
            </div>
          </div>

          {/* Sidebar Area (takes up 1 column on large screens) */}
          <aside>
            <div className="bg-light-slate p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-2xl font-bold font-heading text-charcoal mb-4">
                At a Glance
              </h3>
              <ul className="space-y-4">
                {status && (
                  <li>
                    <strong className="block text-ltl-deep-blue">Status:</strong>
                    <span>{status}</span>
                  </li>
                )}
                {targetAudience && (
                  <li>
                    <strong className="block text-ltl-deep-blue">Target Audience:</strong>
                    <span>{targetAudience}</span>
                  </li>
                )}
                {keyMetrics && keyMetrics.length > 0 && (
                  <li>
                    <strong className="block text-ltl-deep-blue">Key Metrics:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {keyMetrics.map((metric) => (
                        <li key={metric._key}>
                          {metric.value} {metric.label}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
              {/* Program-specific CTA button */}
              <div className="mt-6">
                <Link
                  href="/donate"
                  className="block w-full text-center bg-hopeful-yellow text-charcoal font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors duration-200"
                >
                  Support This Program
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
