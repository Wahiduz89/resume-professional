// lib/cloudinary-guest.ts - Guest user Cloudinary handling
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface GuestUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  guestToken: string
}

// Upload image for guest users with special tagging
export async function uploadGuestImage(
  buffer: Buffer,
  fileName: string,
  sessionId: string
): Promise<GuestUploadResult> {
  return new Promise((resolve, reject) => {
    const guestToken = `guest_${sessionId}_${Date.now()}`
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resume-guest-images',
        public_id: guestToken,
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ],
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        tags: ['guest', 'temporary', `session_${sessionId}`],
        context: {
          upload_type: 'guest',
          session_id: sessionId,
          uploaded_at: new Date().toISOString()
        }
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve({
            ...result,
            guestToken
          } as GuestUploadResult)
        } else {
          reject(new Error('Upload failed'))
        }
      }
    )

    uploadStream.end(buffer)
  })
}

// Transfer guest image to authenticated user
export async function transferGuestImageToUser(
  guestPublicId: string,
  userId: string
): Promise<{ public_id: string; secure_url: string }> {
  try {
    // Get the existing image
    const resource = await cloudinary.api.resource(guestPublicId)
    
    // Create new public ID for authenticated user
    const newPublicId = `${userId}-${Date.now()}`
    
    // Copy the image to the authenticated user's folder
    const result = await cloudinary.uploader.upload(resource.secure_url, {
      folder: 'resume-profile-images',
      public_id: newPublicId,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
      tags: ['authenticated', 'profile'],
      context: {
        upload_type: 'authenticated',
        user_id: userId,
        transferred_from: guestPublicId,
        transferred_at: new Date().toISOString()
      }
    })
    
    // Delete the original guest image
    await cloudinary.uploader.destroy(guestPublicId)
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url
    }
  } catch (error) {
    console.error('Error transferring guest image:', error)
    throw error
  }
}

// Cleanup old guest images (run periodically)
export async function cleanupGuestImages(maxAgeHours: number = 24): Promise<void> {
  try {
    const cutoffTime = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000)
    
    // Search for guest images older than cutoff time
    const result = await cloudinary.search
      .expression('tags:guest AND tags:temporary')
      .sort_by([['created_at', 'desc']])
      .max_results(500)
      .execute()
    
    const imagesToDelete = result.resources.filter(resource => {
      const createdAt = new Date(resource.created_at)
      return createdAt < cutoffTime
    })
    
    if (imagesToDelete.length > 0) {
      const publicIds = imagesToDelete.map(img => img.public_id)
      await cloudinary.api.delete_resources(publicIds)
      console.log(`Cleaned up ${publicIds.length} old guest images`)
    }
  } catch (error) {
    console.error('Error cleaning up guest images:', error)
  }
}

export async function deleteGuestImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting guest image:', error)
  }
}