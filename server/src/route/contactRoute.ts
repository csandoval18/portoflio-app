const router = require('express').Router()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { oauth2 } = require('googleapis/build/src/apis/oauth2')

const CLIENT_ID =
	'338140014948-akp10n9pm4sqhcto046oerdp20c15atn.apps.googleusercontent.com'
const CLEINT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN =
	'1//04o9TW38fl_HBCgYIARAAGAQSNwF-L9IrDajs85uCGzlnYjJ0J4TmSmagbigKCzTaRTRkDWrFhSALrF-By_3BtTNi8YyQrMSHy5o'

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLEINT_SECRET,
	REDIRECT_URI,
)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

router.post('/contact', async (req: any, res: any) => {
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
				user: 'chris.sandoval1018@gmail.com',
				clientId: CLIENT_ID,
				clientSecret: CLEINT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		})

		const mailOptions = {
			from: data.email,
			to: 'chris.sandoval1018@gmail.com',
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
				//successful messge sent
				res.status(200).json({ msg: 'Your message was sent' })
			} catch (error) {
				if (error)
					return res.status(500).json({ msg: 'There is a server error' })
			}
		})
	} catch (error) {
		return error
	}
})

module.exports = router
