import Home from '../Portfolio-Container/Home/Home'
import AboutMe from '../Portfolio-Container/AboutMe/AboutMe'
import Resume from '../Portfolio-Container/Resume/Resume'
import ContactMe from '../Portfolio-Container/ContactMe/ContactMe'

export interface ScreenType {
	screen_name: string
	component: any
	alreadyRendered: Boolean
}

export const TOTAL_SCREENS = [
	{
		screen_name: 'Home',
		component: Home,
		alreadyRendered: false,
	},
	{
		screen_name: 'About Me',
		component: AboutMe,
		alreadyRendered: false,
	},
	{
		screen_name: 'Resume',
		component: Resume,
		alreadyRendered: false,
	},
	{
		screen_name: 'Contact Me',
		component: ContactMe,
		alreadyRendered: false,
	},
]

//searches for index of screen with argument screen_name
export const GET_SCREEN_INDEX = (screen_name: string) => {
	if (!screen_name) return -1
	for (let i = 0; i < TOTAL_SCREENS.length; ++i) {
		if (TOTAL_SCREENS[i].screen_name === screen_name) return i
	}
	return -1
}
