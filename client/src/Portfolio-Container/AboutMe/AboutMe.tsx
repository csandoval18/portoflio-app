import React from 'react'
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading'
import Animations from '../../Utilities/animations'
import ScrollService from '../../Utilities/scrollService'
import './AboutMe.css'

interface AboutMeProps {
	id: string
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
				I am an aspiring Full-Stack web developer, but I currently specialize
				with the Front End. I have solid knowledge in multiple programming
				languages and concepts, and I always aspire to grow as a developer by
				learning new technologies, and also by researching and practicing with
				my current stack to gain mastery in my craft.
				<br></br>
				<br></br>I primarily work with Javascript stacks. I use ReactJS and
				NextJS in the Front-End, switching between SSR and CSR depending on
				project needs. In the Back-End I mostly use express servers with GraphQL
				and Rest APIs. The databases I am most familiar with are MongoDB, mySQL,
				PostgreSQL, and Redis.
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
								className='btn primary-btn-dark'
								onClick={() => ScrollService.scrollHandler.scrollToContactMe()}
							>
								Contact Me
							</button>
							<a
								className='btn highlighted-btn-dark'
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
