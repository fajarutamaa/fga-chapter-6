const router = require('express').Router()
const storage = require('../libs/multer')
const { MediaImages, MediaVideos, MediaFiles, GenerateQr } = require('../controller/media.controller')

router.post('/images', storage.image.single('images'), MediaImages)
router.post('/videos', storage.video.single('videos'), MediaVideos)
router.post('/files', storage.file.single('files'), MediaFiles)
router.post('/qr-generate', GenerateQr)

module.exports = router