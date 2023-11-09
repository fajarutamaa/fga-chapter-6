const qr = require('node-qr-image')

function MediaImages(req, res) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    return res.status(200).json({
        data: { image_url: imageUrl },
        message: 'succes',
        status: 200,
        error: null,
    })
}

function MediaVideos(req, res) {
    const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`

    return res.status(200).json({
        data: { video_url: videoUrl },
        message: 'succes',
        status: 200,
        error: null,
    })
}

function MediaFiles(req, res) {
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`

    return res.status(200).json({
        data: { file_url: fileUrl },
        message: 'succes',
        status: 200,
        error: null,
    })
}

function GenerateQr(req, res) {
    const message = req.query.message

    try {
        var pngString = qr.image(message, { type: 'png' })
        pngString.pipe(require('fs').createWriteStream(`${message.toLowerCase()}.png`))

        return res.status(200).json({
            data: pngString,
            message: 'succes',
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
    MediaVideos,
    MediaFiles,
    GenerateQr
}