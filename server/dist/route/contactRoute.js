"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config;
const router = require('express').Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
router.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    if (data.length === 0 ||
        data.email.length === 0 ||
        data.message.length === 0) {
        return res.json({ msg: 'Please fill all the fields' });
    }
    try {
        const accessToken = yield oAuth2Client.getAccessToken();
        const trasport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
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
        };
        trasport.sendMail(mailOptions, (error) => {
            try {
                if (error) {
                    return res.status(400).json({ msg: 'Please fill all the fields!' });
                }
                return res.status(200).json({ msg: 'Your message was sent' });
            }
            catch (error) {
                return res.status(500).json({ msg: 'There is a server error' });
            }
        });
    }
    catch (error) {
        return error;
    }
}));
module.exports = router;
//# sourceMappingURL=contactRoute.js.map