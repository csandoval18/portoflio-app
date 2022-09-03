import TypeAnimation from 'react-type-animation'
import ScrollService from '../../../Utilities/scrollService'
import './Profile.css'

const Profile = () => {
	return (
		<div className='profile-container'>
			<div className='profile-parent'>
				<div className='profile-details'>
					<div className='colz'>
						<div className='colz-icon'>
							<a href='https://www.linkedin.com/in/christian-a-2151011b9/'>
								<i className='fa fa-linkedin-square fa-2x'></i>
							</a>
							<a href='https://github.com/csandoval18'>
								<i className='fa fa-github-square fa-2x'></i>
							</a>
						</div>
					</div>
					<div className='profile-details-name'>
						<span className='primary-text'>
							<p>Welcome to my</p>
						</span>
						<span className='highlighted-text'>
							<p>Website!</p>
						</span>
					</div>
					<div className='profile-details-role'>
						<span className='type-animation '>
							<h1>
								<TypeAnimation
									cursor={true}
									repeat={Infinity}
									sequence={[
										'Junior Developer 💻',
										1500,
										'Front-End Apps',
										1500,
										'Back-End Servers',
										1500,
										'React + Redux',
										1500,
										'PostgreSQL',
										1500,
										'MongoDB',
										1500,
										'Restful & GraphQL APIs',
										1500,
										'LAMP Stack',
										1500,
										'Fast learner 🤓',
										1500,
									]}
								/>
							</h1>
						</span>
						<span className='profile-role-tagline'>
							<p style={{ lineHeight: '2' }}>
								Hello! my name is Christian. I am a recent Computer Science
								graduate striving to kick off my career in the
								<br></br> software development industry!
							</p>
						</span>
					</div>
					<div className='profile-options'>
						<button
							className='btn primary-btn'
							onClick={() => ScrollService.scrollHandler.scrollToContactMe()}
						>
							Contact Me
						</button>
						<a
							className='btn highlighted-btn'
							href='Resume.pdf'
							download='CAS_Resume.pdf'
						>
							Get Resume
						</a>
					</div>
				</div>
				<div className='profile-picture'>
					<div className='profile-picture-background'></div>
				</div>
			</div>
		</div>
	)
}

export default Profile
