const express = require('express')
const app = express()
const router = require('./routes/route')

require('dotenv').config()

const port = process.env.PORT || 3000

app.use('/image', express.static('public/images'))
app.use('/file', express.static('public/files'))

app.use('/', router)

app.listen(port, () => {
    console.log(`server running on port : ${port}`)
}
)