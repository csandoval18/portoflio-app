import { RequestHandler, Response } from 'express'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const contactRoute = require('./route/contactRoute.js')

const app = express()

const redirectPageToSSL: RequestHandler = (req, res, next) => {
	if (req.header('x-forwarded-proto') !== 'https')
		res.redirect(`https://${req.header('host')}${req.url}`)
	else next()
}

if (process.env.NODE_ENV === 'production') {
	app.use(redirectPageToSSL)
}

//creating the middleware
app.use(express.json())
app.use(cors())

app.use('/', contactRoute)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (res: Response) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
	)
}

const port = process.env.PORT
app.listen(port, console.log('Server started in port:', process.env.PORT))

// app.use(express.static('./client'));
