import axios from 'axios'
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import TypeAnimation from 'react-type-animation'

import contactMeBG from '../../assets/ContactMe/contactmebg.jpg'
import load from '../../assets/ContactMe/load.gif'
import Animations from '../../Utilities/animations'
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../Utilities/scrollService'
import './ContactMe.css'

const ContactMe = (props) => {
	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen !== props.id) return
		Animations.animations.fadeInScreen(props.id)
	}

	ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [banner, setBanner] = useState('')
	const [bool, setBool] = useState(false)

	const handleName = (e) => {
		setName(e.target.value)
	}
	const handleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleMessage = (e) => {
		setMessage(e.target.value)
	}
	//HTML Request
	const submitForm = async (e) => {
		e.preventDefault()
		try {
			let data = {
				name,
				email,
				message,
			}
			setBool(true)
			const res = await axios.post('/contact', data)

			if (name.length === 0 || email.length === 0 || message.length === 0) {
				setBanner(res.data.msg)
				// toast.error(res.data.msg);
				setBool(false)
			} else if (res.status === 200) {
				setBanner(res.data.msg)
				// toast.success(res.data.msg);
				setBool(false)

				//reset inputs vars
				setName('')
				setEmail('')
				setMessage('')
			}
		} catch (error) {
			console.log('Error: ' + error)
		}
	}

	return (
		<div className='main-container fade-in' id={props.id || ''}>
			<ScreenHeading subHeading={'Send me a message'} title={'Contact Me'} />
			<div className='central-form'>
				<div className='row'>
					<h2 className='title'>
						<TypeAnimation
							cursor={true}
							repeat={1}
							sequence={['Send your message here:', 2000]}
						/>
					</h2>
				</div>
				<div className='back-form'>
					<div className='img-back'>
						<img src={contactMeBG} alt='unable to load' />
					</div>
					<form onSubmit={submitForm}>
						<p>{banner}</p>
						<label htmlFor='name'>Name</label>
						<input type='text' onChange={handleName} value={name} />
						<label htmlFor='email'>Email</label>
						<input type='email' onChange={handleEmail} value={email} />
						<label htmlFor='message'>Message</label>
						<textarea type='text' onChange={handleMessage} value={message} />
						<div className='submit-btn'>
							<button type='submit'>Send</button>
							{bool ? (
								<b className='load'>
									<img src={load} alt='unable to load' />
								</b>
							) : (
								''
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ContactMe
