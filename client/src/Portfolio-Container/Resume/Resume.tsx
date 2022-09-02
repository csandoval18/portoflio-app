import React, { useState } from 'react'
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../Utilities/scrollService'
import Animations from '../../Utilities/animations'
import './Resume.css'
import { ScreenType } from '../../Utilities/screens'

interface ResumeProps {
	id: string
}

interface ResumeHeadingProps {
	heading?: string
	fromDate?: string
	toDate?: string
	subHeading?: string
	description?: string
}

const Resume = (props: ResumeProps) => {
	const [selectedBulletIndex, setSelectedBulletIndex] = useState(0)
	const [carouselOffSetStyle, setCarouselOffSetStyle] = useState({})

	let fadeInScreenHandler = (screen: any) => {
		if (screen.fadeInScreen !== props.id) return
		Animations.animations.fadeInScreen(props.id)
	}

	ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)

	const ResumeHeading = (props: ResumeHeadingProps) => {
		return (
			<div className='resume-heading'>
				<div className='resume-main-heading'>
					<div className='heading-bullet'></div>
					<span>{props.heading ? props.heading : ''}</span>
					{props.fromDate && props.toDate ? (
						<div className='heading-date'>
							{props.fromDate + '-' + props.toDate}
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className='resume-sub-heading'>
					<span>{props.subHeading ? props.subHeading : ''}</span>
				</div>
				<div className='resume-heading-description'>
					<span>{props.description ? props.description : ''}</span>
				</div>
			</div>
		)
	}

	const resumeBullets = [
		{ label: 'Education', logoSrc: 'education.svg' },
		{ label: 'Work History', logoSrc: 'work-history.svg' },
		{
			label: 'Programming Skills',
			logoSrc: 'programming-skills.svg',
		},
		{ label: 'Projects', logoSrc: 'projects.svg' },
		{ label: 'Interests', logoSrc: 'interests.svg' },
	]

	const programmingSkillsDetails = [
		{ skill: 'Javacript', ratingPercentage: 90 },
		{ skill: 'Typecript', ratingPercentage: 85 },
		{ skill: 'NodeJS', ratingPercentage: 90 },
		{ skill: 'ReactJS', ratingPercentage: 85 },
		{ skill: 'SCSS', ratingPercentage: 85 },
		{ skill: 'SQL', ratingPercentage: 80 },
		{ skill: 'MongoDB', ratingPercentage: 75 },
		{ skill: 'ExpressJS', ratingPercentage: 80 },
		{ skill: 'Python', ratingPercentage: 70 },
		{ skill: 'Flutter', ratingPercentage: 65 },
		{ skill: 'PHP', ratingPercentage: 80 },
		{ skill: 'Laravel', ratingPercentage: 65 },
	]

	const projectsDetails = [
		{
			title: 'Personal Portfolio Website',
			duration: { fromDate: '2022', toDate: '2022' },
			subHeading: 'Technologies Used: ReactJS, HTML, CSS',
			description:
				'A personal portfolio website used to resume my skills aquired throughout my college education and hone my ReactJS knowledge.',
		},
		{
			title: 'Student Wellness App',
			duration: { fromDate: '2022', toDate: '2022' },
			subHeading: 'Technologies Used: Flutter, Dart, mySQL',
			description:
				'Group project developed for Software Engineering class focusing on the development of a mobile application for student atheletes seeking counselor help',
		},
		{
			title: 'DBMS Project',
			duration: { fromDate: '2020', toDate: '2020' },
			subHeading: 'Technologies Used: PHP, mySQL, HTML, CSS',
			description:
				'Project developed for DBMS class. Focusing on pagination of data, account handling with cart and wishlists. First website development experience.',
		},
	]

	const resumeDetails = [
		<div
			className='resume-screen-container education-container'
			key='education'
		>
			<ResumeHeading
				heading={'University of Wisconsin - Whitewater'}
				subHeading={'Bachelor of Science in Computer Science'}
				fromDate={'2018'}
				toDate={'2022'}
			/>
			<ResumeHeading
				heading={'High School'}
				subHeading={'Sun Prairie High School'}
				fromDate={'2014'}
				toDate={'2018'}
			/>
			<br />
		</div>,
		<div className='resume-screen-container' key='work-experience'>
			<ResumeHeading
				heading={'UWW-Housing Development Services'}
				subHeading={'Student Web Developer'}
				fromDate={'2021'}
				toDate={'2022'}
			/>
			<div className='experience-description'>
				<div className='resume-description-text'>
					<span className='we-desc'>
						- Development and maintanance of web applications with HTML, JQuery,
						Laravel, and MySQL. The applications were for use of residence hall
						front desk workers, students, and staff.
					</span>
				</div>
			</div>
			<div className='experience-description'>
				<div className='resume-description-text'>
					<span className='we-desc'>
						- Creation and management of the university's domain websites for
						the housing department using Ingeniux CMS.
					</span>
				</div>
			</div>
			<div className='experience-description'>
				<div className='resume-description-text'>
					<span className='we-desc'>
						- Troubleshooting problems and aiding students with personal account
						issues in the university system.
					</span>
				</div>
			</div>
		</div>,

		<div
			className='resume-screen-container programming-skills-container'
			key='programming-skills'
		>
			{programmingSkillsDetails.map((skill, index) => (
				<div className='skill-parent' key={index}>
					<span>{skill.skill}</span>
					<div className='skill-percentage'>
						<div
							className='active-percentage'
							style={{ width: skill.ratingPercentage + '%' }}
						></div>
					</div>
				</div>
			))}
		</div>,
		<div className='resume-screen-container projects-container' key='projects'>
			{projectsDetails.map((projectsDetails, index) => (
				<ResumeHeading
					key={index}
					heading={projectsDetails.title}
					subHeading={projectsDetails.subHeading}
					description={projectsDetails.description}
					fromDate={projectsDetails.duration.fromDate}
					toDate={projectsDetails.duration.toDate}
				/>
			))}
		</div>,
		<div
			className='resume-screen-container interests-container'
			key='interests'
		>
			<ResumeHeading
				heading='Learning'
				description='Wether it is in the workplace or in my free time, I am always eager to learn new programming techonologies as well as improving my application of algorithms and data structures to solve real world problems. My professional goal is to gain mastery of these concepts and spread my knowledge to others.'
			/>
			<ResumeHeading
				heading='Music'
				description='Discovering and listening to music is one of my favorite pass times. Listening to soothing music allows me to relax during stressful times and remain focused on my daily tasks.'
			/>
			<ResumeHeading
				heading='Digital Art'
				description='I recently gained a passion for digital art and design. In my spare time I really enjoy making custom designs in photoshop and making vector drawings with illustrator.'
			/>
		</div>,
	]

	const handleCarousel = (index: number) => {
		let offsetHeight = 360
		let newCarouselOffset = {
			style: {
				transform: 'translateY(' + index * offsetHeight * -1 + 'px)',
			},
		}
		setCarouselOffSetStyle(newCarouselOffset)
		setSelectedBulletIndex(index)
	}

	const getBullets = () => {
		return resumeBullets.map((bullet, index) => (
			<div
				className={
					index === selectedBulletIndex ? 'bullet selected-bullet' : 'bullet'
				}
				onClick={() => handleCarousel(index)}
				key={index}
			>
				<img
					className='bullet-logo'
					src={require(`../../assets/Resume/${bullet.logoSrc}`)}
					alt='no internet connection'
				/>
				<span className='bullet-label'>{bullet.label}</span>
			</div>
		))
	}

	const getResumeScreen = () => {
		return (
			<div
				className='resume-details-carousel'
				// @ts-ignore
				style={carouselOffSetStyle.style}
			>
				{resumeDetails.map((ResumeDetail) => ResumeDetail)}
			</div>
		)
	}

	return (
		<div
			className='resume-container screen-container fade-in'
			id={props.id || ''}
		>
			<ScreenHeading title={'Resume'} subHeading={'My Details'} />
			<div className='resume-content'>
				<div className='resume-card'>
					<div className='resume-bullets'>
						<div className='bullet-container'>
							<div className='bullet-icons'></div>
							<div className='bullets'>{getBullets()}</div>
						</div>
					</div>
					<div className='resume-bullet-details'>{getResumeScreen()}</div>
				</div>
			</div>
		</div>
	)
}

export default Resume
