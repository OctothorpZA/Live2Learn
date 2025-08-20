"use client"

import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  layout: 'fill' | 'intrinsic' | 'fixed' | 'responsive'
}

/**
 * A Client Component to safely render product images with an onError fallback.
 * This is necessary to avoid passing event handlers from Server Components.
 */
export default function ProductImage({
  src,
  alt,
  className,
  layout,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  const placeholderImg =
    'https://placehold.co/600x400/EEE/31343C?text=No+Image'

  return (
    <Image
      src={imgSrc || placeholderImg}
      alt={alt}
      className={className}
      layout={layout}
      onError={() => {
        setImgSrc(placeholderImg)
      }}
    />
  )
}
