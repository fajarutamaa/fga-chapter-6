# Introduction

This repository contains media handling processes on backend roles using Node.js with the [multer](https://github.com/expressjs/multer) package manager. In this repository, there is also a process for generating QR codes using the [node-qr-image](https://github.com/wanming/qr-image) package manager.

## Project Setup

Clone the project from GitHub repository:

    git clone https://github.com/fajarutamaa/fga-chapter-6.git

Install all package dependencies:

    npm install

Compile and hot-reload for development:

    npm run dev

## Usage

Below is an example how to use multer for handling media images, videos and pdf. This example configure on `libs/multer.js`

```javascript
const multer = require('multer')
const path = require('path')

function filename(req, file, callback) {
    const fileName = Date.now() + path.extname(file.originalname)
    callback(null, fileName)
}

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination)
        },
        filename
    })
}



module.exports = {
    image: multer({
        storage: generateStorage('./media/images'),
        fileFilter: (req, file, callback) => {
            const allowMimeTypeTypes = ['image/png', 'image/jpg', 'image/jpeg']

            if (allowMimeTypeTypes.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const error = new Error(`Only allowed ${allowMimeTypeTypes.join(', ')}allow to upload`)
                callback(error, false)
            }
        },
        onError: (error, next) => {
            next(error)
        }
    }),

    video: multer({
        storage: generateStorage('./media/videos'),
        fileFilter: (req, file, callback) => {
            const allowMimeTypeTypes = ['video/mp4', 'video/x-msvideo', 'video/quicktime']

            if (allowMimeTypeTypes.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const error = new Error(`Only allowed ${allowMimeTypeTypes.join(', ')}allow to upload`)
                callback(error, false)
            }
        },
        onError: (error, next) => {
            next(error)
        }
    }),

    file: multer({
        storage: generateStorage('./media/files'),
        fileFilter: (req, file, callback) => {
            const allowMimeTypeTypes = ['application/pdf']

            if (allowMimeTypeTypes.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const error = new Error(`Only allowed ${allowMimeTypeTypes.join(', ')}allow to upload`)
                callback(error, false)
            }
        },
        onError: (error, next) => {
            next(error)
        }
    })
}
```
Below is an example how to generate text to QR Code. This example configure on `controller/media.controller.js`

```javascript
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
    GenerateQr
}
```



### License
[MIT](https://github.com/fajarutamaa/fga-chapter-6/blob/main/LICENSE)
