// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
}

export async function uploadToCloudinary(
  buffer: Buffer,
  fileName: string,
  userId: string
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resume-profile-images',
        public_id: `${userId}-${Date.now()}`,
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ],
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result as CloudinaryUploadResult)
        } else {
          reject(new Error('Upload failed'))
        }
      }
    )

    uploadStream.end(buffer)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
  }
}