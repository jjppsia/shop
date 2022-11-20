import express from 'express'
import multer from 'multer'
import path from 'path'
import { adminAuth, verifyToken } from '../middlewares/auth.js'

const router = express.Router()

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (!extname || !mimetype) {
    cb('Images only!')
  }

  return cb(null, true)
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage, fileFilter: (req, file, cb) => checkFileType(file, cb) })

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
