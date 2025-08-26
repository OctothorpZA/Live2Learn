import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'
import DateComponent from '@/app/components/Date'

// FIX: The person type is updated to expect a single 'name' field, matching the GROQ query.
type Props = {
  person: {
    name?: string | null
    picture?: any
  }
  date?: string
  small?: boolean
}

export default function Avatar({ person, date, small = false }: Props) {
  // FIX: Destructure the 'name' field instead of firstName and lastName.
  const { name, picture } = person

  return (
    <div className="flex items-center font-mono">
      {picture?.asset?._ref ? (
        <div className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <Image
            // FIX: Use the 'name' field for the alt text.
            alt={name || 'Author avatar'}
            className="h-full rounded-full object-cover"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            src={
              urlForImage(picture)
                ?.height(small ? 64 : 96)
                .width(small ? 64 : 96)
                .fit('crop')
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {/* FIX: Display the single 'name' field. */}
        {name && (
          <div className={`font-bold ${small ? 'text-sm' : ''}`}>{name}</div>
        )}
        <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}
