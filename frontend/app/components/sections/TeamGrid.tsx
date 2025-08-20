'use client'

import Image from 'next/image'

// Define the type for a single team member
type TeamMember = {
  _id: string
  name?: string | null
  role?: string | null
  image?: string | null
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal">
            {headline || 'Meet Our Team'}
          </h2>
          {intro && (
            <p className="mt-4 text-lg max-w-3xl mx-auto text-charcoal">
              {intro}
            </p>
          )}
        </div>

        {/* Responsive Grid for Team Members */}
        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member._id} className="text-center">
                <div className="relative h-40 w-40 mx-auto mb-4">
                  <Image
                    src={member.image || 'https://placeholder.co/400x400?text=Photo'}
                    alt={member.name || 'Team member'}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <h3 className="text-xl font-bold font-heading text-ltl-deep-blue">
                  {member.name}
                </h3>
                <p className="text-base text-charcoal">{member.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No team members found.</p>
        )}
      </div>
    </section>
  )
}
