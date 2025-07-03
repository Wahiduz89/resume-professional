// components/resume/profile-image.tsx
import React, { useState } from 'react'

interface ProfileImageProps {
  src: string
  alt: string
  className: string
  fallbackContent: React.ReactNode
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  className,
  fallbackContent
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  if (!src || imageError) {
    return <div className={className}>{fallbackContent}</div>
  }

  return (
    <div className="relative">
      {imageLoading && <div className={className}>{fallbackContent}</div>}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true)
          setImageLoading(false)
        }}
        style={{ transition: 'opacity 0.3s ease' }}
      />
    </div>
  )
}