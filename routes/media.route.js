const router = require('express').Router()
const storage = require('../libs/multer')
const { MediaImages, MediaVideos, MediaFiles, GenerateQr, MediaImage , ImageKitUpload} = require('../controller/media.controller')

router.post('/image', storage.image.single('image'), MediaImage)
router.post('/images', storage.image.array('images', 2), MediaImages)
router.post('/videos', storage.video.single('videos'), MediaVideos)
router.post('/files', storage.file.single('files'), MediaFiles)
router.post("/imagekit", multer.single('image'),  ImageKitUpload)
router.post('/qr-generate', GenerateQr)

module.exports = router