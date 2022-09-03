import React from 'react'
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading'
import Animations from '../../Utilities/animations'
import ScrollService from '../../Utilities/scrollService'
import './AboutMe.css'

interface AboutMeProps {
	id: string
	screenName: string
}

const AboutMe = (props: AboutMeProps) => {
	let fadeInScreenHandler = (screen: any) => {
		if (screen.fadeInScreen !== props.id) return
		Animations.animations.fadeInScreen(props.id)
	}

	ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)

	const SCREEN_CONSTANTS = {
		description: (
			<div>
				Hello! I am a Junior Software Engineer specializing with Front End
				development.
				<br></br>
				<br></br>I have experience working with Typescript
				<br></br>
				<br></br>I would describe myself as a fast learner. I am happy to learn
				any development technologies and concepts. My special interests are
				staying up to date with developer trends and new releases of my
				techonologies of interest. My future goals are to to become proficient
				in mobile development by learning Kotlin, contributing to open source
				software, and getting familiar with cloud services such as AWS and
				Azure.
			</div>
		),
		highlights: {
			bullets: [
				'Full Stack development',
				'Responsive Front End UI design',
				'SCSS, Tailwind, Styled Components, ChakraUI',
				'SSR & CSR',
				'Express Servers',
				'MongoDB, PostgreSQL, Redis',
				'GraphQL & Rest APIs',
				'LAMP Stack',
			],
			heading: 'Highlight skills:',
		},
	}

	const renderHighlight = () => {
		return SCREEN_CONSTANTS.highlights.bullets.map((value, i) => (
			<div className='highlight' key={i}>
				<div className='highlight-blob'></div>
				<span>{value}</span>
			</div>
		))
	}

	return (
		<div
			className='about-me-container screen-container fade-in'
			id={props.id || ''}
		>
			<div className='about-me-parent'>
				<ScreenHeading title={'About Me'} subHeading={'My background'} />
				<div className='about-me-card'>
					<div className='about-me-profile'></div>
					<div className='about-me-details'>
						<span className='about-me-desc'>
							{SCREEN_CONSTANTS.description}
						</span>
						<div className='about-me-highlights'>
							<div className='highlight-heading'>
								<span>{SCREEN_CONSTANTS.highlights.heading}</span>
							</div>
							{renderHighlight()}
						</div>
						<div className='about-me-options'>
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
				</div>
			</div>
		</div>
	)
}

export default AboutMe
