import express, { Request, Response } from 'express'
import cors from 'cors'
import fs from 'fs'
import multer, { StorageEngine } from 'multer'
import mongoose from 'mongoose'

const url =
	'mongodb+srv://nazar:2136nazarm@cluster0.li21gxm.mongodb.net/?retryWrites=true&w=majority'

mongoose
	.connect(url, { retryWrites: true, w: 'majority' })
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err))

const storage: StorageEngine = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads')
		}
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/', (_, res) => {
	res.send('OK')
})

const server = app.listen(4444, () => {
	console.log('Server OK')
})
server.on('error', (e) => console.error('Error', e))
