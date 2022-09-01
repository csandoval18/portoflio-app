import { TOTAL_SCREENS } from './screens'
import { Subject } from 'rxjs'

export default class ScrollService {
	static scrollHandler = new ScrollService()
	static currentScreenBroadCaster = new Subject()
	static currentScreenFadeIn = new Subject()

	constructor() {
		window.addEventListener('scroll', this.checkCurrentScreenUnderViewport)
	}

	scrollToContactMe = () => {
		let contactMeScreen = document.getElementById('Contact Me')
		if (!contactMeScreen) return
		contactMeScreen.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}

	scrollToHome = () => {
		let homeScreen = document.getElementById('Home')
		if (!homeScreen) return
		homeScreen.scrollIntoView({ behavior: 'smooth' })
	}

	isElementInView = (elem, type) => {
		let rect = elem.getBoundingClientRect()
		let elementTop = rect.top
		let elementBottom = rect.bottom

		let partiallyVisible =
			elementTop < window.innerHeight - 1 && elementBottom >= 0
		let completelyVisible =
			elementTop >= 0 && elementBottom <= window.innerHeight

		switch (type) {
			case 'partial':
				return partiallyVisible
			case 'complete':
				return completelyVisible
			default:
				return false
		}
	}

	checkCurrentScreenUnderViewport = (event) => {
		if (!event || event.length < 1) return

		for (let screen of TOTAL_SCREENS) {
			let screenFromDOM = document.getElementById(screen.screen_name)
			if (!screenFromDOM) continue

			let partiallyVisible = this.isElementInView(screenFromDOM, 'partial')
			let fullyVisible = this.isElementInView(screenFromDOM, 'complete')

			if (fullyVisible || partiallyVisible) {
				if (partiallyVisible && !screen.alreadyRendered) {
					ScrollService.currentScreenFadeIn.next({
						fadeInScreen: screen.screen_name,
					})
					screen['alreadyRendered'] = true
					break
				}
				if (fullyVisible) {
					ScrollService.currentScreenBroadCaster.next({
						screenInView: screen.screen_name,
					})
					break
				}
			}
		}
	}
}
