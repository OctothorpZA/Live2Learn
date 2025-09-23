'use client'

import Image from 'next/image'
import Link from 'next/link'

// Custom Icons
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

// Team member data based on LTL research
const teamMembers = [
  {
    _id: '1',
    name: 'Sonja Botha',
    role: 'Founder & Executive Director',
    specialty: 'Foundation Phase Literacy, Gattegno Methodology',
    yearsWithLTL: 14,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Sonja+Botha',
    bio: 'Former Education Alive director with 35+ years in education. Pioneered the transition from Education Alive to Living Through Learning in 2010, bringing proven methodologies to disadvantaged communities.'
  },
  {
    _id: '2',
    name: 'Clarice Joubert',
    role: 'Senior Reading Adventure Room Facilitator',
    specialty: 'Classroom Implementation, Student Engagement',
    yearsWithLTL: 8,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Clarice+Joubert',
    bio: 'Leads Reading Adventure Room implementations, praised by educators for making literacy "fun" and confidence-building.'
  },
  {
    _id: '3',
    name: 'Toheera Benting',
    role: 'Reading Adventure Room Facilitator',
    specialty: 'Academic Excellence, Student Support',
    yearsWithLTL: 5,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Toheera+Benting',
    bio: 'Achieved 15 distinctions in first year B.Ed., demonstrating LTL\'s study techniques. Focuses on improved comprehension and classroom participation.'
  },
  {
    _id: '4',
    name: 'Monique Parring',
    role: 'Senior Manager',
    specialty: 'Program Development, Educational Strategy',
    yearsWithLTL: 7,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Monique+Parring',
    bio: 'Key management team member supporting LTL\'s strategic growth and program implementation.'
  },
  {
    _id: '5',
    name: 'Dagny Baleson',
    role: 'Operations Manager',
    specialty: 'Educational Operations, Community Partnerships',
    yearsWithLTL: 6,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Dagny+Baleson',
    bio: 'Drives operational excellence and community engagement initiatives.'
  },
  {
    _id: '6',
    name: 'Amy Lategan',
    role: 'Program Coordinator',
    specialty: 'Educator Training, Curriculum Development',
    yearsWithLTL: 4,
    image: 'https://placehold.co/400x400/0057B8/FFFFFF?text=Amy+Lategan',
    bio: 'Coordinates educational programs and supports educator development initiatives.'
  }
]

export default function StaticAboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-ltl-deep-blue via-blue-600 to-ltl-deep-blue text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-hopeful-yellow rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/30">
              <span className="w-2 h-2 bg-hopeful-yellow rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">About Living Through Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Awakening Africa through
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-orange-400">
                Early Literacy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Since 2010, we have been transforming foundation phase education across South Africa, 
              empowering over 150,000 learners and 700+ educators with proven literacy methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-charcoal/80 leading-relaxed">
                  <p>
                    Founded by Sonja Botha in 2010, Living Through Learning emerged from over 35 years 
                    of educational excellence. After successfully leading Education Alive for 25 years, 
                    Sonja recognized the critical need for specialized foundation phase literacy intervention.
                  </p>
                  <p>
                    Our journey began with a simple yet powerful belief: <strong>&quot;Every child is a national 
                    asset and every child must be able to read with meaning.&quot;</strong> This vision has guided 
                    our mission to provide training and interventions that support educators and learners 
                    across South Africa.
                  </p>
                  <p>
                    Today, we operate from Cape Town, partnering with schools in disadvantaged communities 
                    to create Reading Adventure Rooms, train educators, and implement our comprehensive 
                    Foundation Phase literacy curriculum based on Gattegno&apos;s proven &quot;Words in Colour&quot; methodology.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://placehold.co/600x400/0057B8/FFFFFF?text=LTL+Story"
                    alt="Living Through Learning story"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-hopeful-yellow rounded-2xl flex items-center justify-center shadow-xl">
                  <BookOpenIcon className="w-12 h-12 text-ltl-deep-blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-light-slate to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-12">
              Our Vision & Mission
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-ltl-deep-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AwardIcon className="w-8 h-8 text-ltl-deep-blue" />
                </div>
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Our Vision</h3>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  &quot;Every child is a national asset and every child must be able to read with meaning.&quot;
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-hopeful-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-8 h-8 text-ltl-deep-blue" />
                </div>
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Our Mission</h3>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  To provide training and interventions to support educators and learners in South Africa 
                  in literacy, giving youth a chance to flourish in their formative schooling years.
                </p>
              </div>
            </div>
            
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              We believe in developing learners&apos; confidence and career dreams through improved reading 
              and writing comprehension, not just basic skills acquisition. Our approach ignites 
              educators&apos; passion through practical training that delivers measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-6">
                The Living Through Learning Methodology
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                Our unique approach combines proven pedagogy with practical implementation, 
                focusing on foundation phase success for children aged 4-7 years.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-ltl-deep-blue/5 to-ltl-deep-blue/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-ltl-deep-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ltl-deep-blue mb-4">Motor Skills Development</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Mastering fine and gross motor skills builds confidence in small children. 
                  Our preparatory activities strengthen foundations essential for learning.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-hopeful-yellow/20 to-hopeful-yellow/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-hopeful-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UsersIcon className="w-8 h-8 text-ltl-deep-blue" />
                </div>
                <h3 className="text-xl font-bold text-ltl-deep-blue mb-4">Reading Comprehension</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Using Gattegno&apos;s &quot;Words in Colour&quot; methodology, we focus on understanding 
                  and processing information, ensuring children read with meaning.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AwardIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ltl-deep-blue mb-4">Practical Training</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Our learner-centric, outcome-driven approach measures both qualitative 
                  and quantitative results, informed by 35+ years of field experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-light-slate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-6">
              Our Dedicated Team
            </h2>
            <p className="text-xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed">
              Our passionate educators and literacy specialists bring decades of experience to transforming 
              foundation phase education across South Africa. Every member is committed to ensuring every child can read with meaning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group">
                <div className="relative h-32 w-32 mx-auto mb-4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    fill
                    sizes="128px"
                    unoptimized
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-ltl-deep-blue mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-charcoal font-medium">
                      {member.role}
                    </p>
                  </div>
                  {member.specialty && (
                    <p className="text-xs text-charcoal/70 italic">
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
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-ltl-deep-blue to-ltl-deep-blue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              Transforming Lives Through Literacy
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-12">
              Our Reading Adventure Rooms operate in 30+ schools, benefiting approximately 3,000 learners 
              and 105 educators annually. Schools report average English literacy score increases of 10-20% within a term.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-hopeful-yellow mb-2">150,000+</div>
                <div className="text-white/80">Learners Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-hopeful-yellow mb-2">700+</div>
                <div className="text-white/80">Educators Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-hopeful-yellow mb-2">30+</div>
                <div className="text-white/80">Partner Schools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-hopeful-yellow mb-2">80%</div>
                <div className="text-white/80">Literacy Improvement</div>
              </div>
            </div>
            
            <Link
              href="/contact"
              className="inline-flex bg-hopeful-yellow text-ltl-deep-blue font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}