const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Store files in memory, then upload to Cloudinary manually
const memoryStorage = multer.memoryStorage()

const uploadImage = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Images only'))
  },
})

const uploadVideo = multer({
  storage: memoryStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowed = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Videos only'))
  },
})

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `roots_abacus/${folder}`, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })
}

module.exports = { cloudinary, uploadImage, uploadVideo, uploadToCloudinary }