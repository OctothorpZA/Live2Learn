'use client'

import Image from 'next/image'

// Define the type for a single team member with enhanced fields
type TeamMember = {
  _id: string
  name?: string | null
  role?: string | null
  specialty?: string | null
  yearsWithLTL?: number | null
  bio?: any[] | null // Rich text content
  displayOrder?: number | null
  image?: string | null
  slug?: string | null
}

// Define the type for the props this component will accept
type TeamGridProps = {
  headline?: string | null
  intro?: string | null
  // The component now accepts the list of team members as a prop
  teamMembers: TeamMember[]
}

// This is now a standard, non-async component
export default function TeamGrid({ headline, intro, teamMembers }: TeamGridProps) {
  return (
    <section className="bg-light-slate py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline and Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-charcoal">
            {headline || 'Our Dedicated Team'}
          </h2>
          {intro && (
            <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto text-charcoal leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Responsive Grid for Team Members */}
        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member) => (
              <div key={member._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group">
                <div className="relative h-32 w-32 mx-auto mb-4 overflow-hidden">
                  <Image
                    src={member.image || 'https://placehold.co/400x400/0057B8/FFFFFF?text=LTL'}
                    alt={member.name ? `${member.name} - ${member.role || 'Team Member'}` : 'LTL Team member'}
                    className="rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    fill
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold font-heading text-ltl-deep-blue mb-1">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-sm lg:text-base text-charcoal font-medium">
                        {member.role}
                      </p>
                    )}
                  </div>
                  {member.specialty && (
                    <p className="text-xs lg:text-sm text-charcoal/70 italic">
                      {member.specialty}
                    </p>
                  )}
                  {member.yearsWithLTL && member.yearsWithLTL > 0 && (
                    <div className="inline-flex items-center gap-1 bg-hopeful-yellow/20 text-ltl-deep-blue px-2 py-1 rounded-full text-xs font-medium">
                      <span>{member.yearsWithLTL}</span>
                      <span>year{member.yearsWithLTL !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-charcoal mb-4">
              Our team information is being updated. Please check back soon.
            </p>
            <p className="text-base text-charcoal/70">
              For immediate inquiries, please visit our contact page.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
