import React from 'react'
import Profile from './Profile/Profile'
import './Home.css'

const Home: React.FC = () => {
	return (
		<div className='home-container' id='Home'>
			<Profile />
		</div>
	)
}

export default Home
