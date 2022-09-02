import { Request, Response } from 'express'
const router = require('express').Router()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

router.post('/contact', async (req: Request, res: Response) => {
	let data = req.body
	if (
		data.length === 0 ||
		data.email.length === 0 ||
		data.message.length === 0
	) {
		return res.json({ msg: 'Please fill all the fields' })
	}
	try {
		const accessToken = await oAuth2Client.getAccessToken()

		const trasport = nodemailer.createTransport({
			// @ts-ignore
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: '',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLEINT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken,
			},
		})

		const mailOptions = {
			from: data.email,
			to: process.env.EMAIL,
			subject: `Message from: ${data.name}`,
			html: `
      <h3>Information</h3>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${data.message}</p>
    `,
		}

		trasport.sendMail(mailOptions, (error: any) => {
			try {
				if (error) {
					return res.status(400).json({ msg: 'Please fill all the fields!' })
				}
				return res.status(200).json({ msg: 'Your message was sent' })
			} catch (error) {
				return res.status(500).json({ msg: 'There is a server error' })
			}
		})
	} catch (error) {
		return error
	}
})

module.exports = router
