const qr = require('node-qr-image')
const { file } = require('../libs/multer')

//for single image
function MediaImage(req, res) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    return res.status(200).json({
        data: { image_url: imageUrl },
        message: 'success',
        status: 200,
        error: null,
    })
}

//for multiple image
function MediaImages(req, res) {
    let respArr = []

    for (let i = 0; req.files.length > i; i++) {
        const fileimage = req.files[i].filename
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${fileimage}`
        respArr.push(imageUrl)
    }


    return res.status(200).json({
        data: { image_url: respArr },
        message: 'upload success',
        status: 200,
        error: null,
    })
}

function MediaVideos(req, res) {
    const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`

    return res.status(200).json({
        data: { video_url: videoUrl },
        message: 'upload success',
        status: 200,
        error: null,
    })
}

function MediaFiles(req, res) {
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`

    return res.status(200).json({
        data: { file_url: fileUrl },
        message: 'upload success',
        status: 200,
        error: null,
    })
}

async function ImageKitUpload(req, res) {
    try {
        const fileString = req.file.buffer.toString('base64')

        const uploadImage = await imagekit.upload({
            fileName: req.file.originalname,
            file: fileString
        })

        res.status(200).json({
            data: uploadImage,
            message: 'upload success',
            status: 200,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: error.message
        })
    }
}

function GenerateQr(req, res) {
    const message = req.query.message

    try {
        var pngString = qr.image(message, { type: 'png' })
        pngString.pipe(require('fs').createWriteStream(`${message.toLowerCase()}.png`))

        return res.status(200).json({
            data: pngString,
            message: 'generate success',
            status: 200,
            error: null,
        })

    } catch (error) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: error.message
        })
    }

}



module.exports = {
    MediaImages,
    MediaImage,
    MediaVideos,
    MediaFiles,
    ImageKitUpload,
    GenerateQr
}