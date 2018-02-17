import {
	mapActions,
	mapGetters,
	mapMutations
} from 'vuex'

const css = (element, css) => {
	let style = element.style

	Object.keys(css).forEach(prop => {
		style[prop] = css[prop]
	})
}

const linear = t => t
const s4 = a => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
const uid = a => s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
let ids = {}

const start = ({
	name,
	duration = 300,
	to,
	from,
	apply,
	done,
	cancel,
	easing
}) => {
	let id = name
	const start = performance.now()

	if (id) {
		stop(id)
	} else {
		id = uid()
	}

	const delta = easing || linear
	const handler = () => {
		let progress = (performance.now() - start) / duration
		if (progress > 1) {
			progress = 1
		}

		const newPos = from + (to - from) * delta(progress)
		apply(newPos, progress)

		if (progress === 1) {
			delete ids[id]
			done && done(newPos)
			return
		}

		anim.last = {
			pos: newPos,
			progress
		}
		anim.timer = window.requestAnimationFrame(handler)
	}

	const anim = ids[id] = {
		cancel,
		timer: window.requestAnimationFrame(handler)
	}

	return id
}

const stop = (id) => {
	if (!id) {
		return
	}
	let anim = ids[id]
	if (anim && anim.timer) {
		cancelAnimationFrame(anim.timer)
		anim.cancel && anim.cancel(anim.last)
		delete ids[id]
	}
}


const getHeight = (el, style) => {
	let initial = {
		visibility: el.style.visibility,
		maxHeight: el.style.maxHeight
	}

	css(el, {
		visibility: 'hidden',
		maxHeight: ''
	})
	const height = style.height
	css(el, initial)

	return parseFloat(height)
}

const parseSize = (padding) => {
	return padding.split(' ').map(t => {
		let unit = t.match(/[a-zA-Z]+/) || ''
		if (unit) {
			unit = unit[0]
		}
		return [parseFloat(t), unit]
	})
}

const toggleSlide = (el, showing, done) => {
	let store = el.__qslidetoggle || {}

	function anim() {
		store.uid = start({
			easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
			duration: 400,
			to: showing ? 100 : 0,
			from: store.pos !== null ? store.pos : showing ? 0 : 100,
			apply(pos) {
				store.pos = pos
				css(el, {
					maxHeight: `${store.height * pos / 100}px`,
					padding: store.padding ? store.padding.map(t => (t[0] * pos / 100) + t[1]).join(' ') : '',
					margin: store.margin ? store.margin.map(t => (t[0] * pos / 100) + t[1]).join(' ') : ''
				})
			},
			done() {
				store.uid = null
				store.pos = null
				done()
				css(el, store.css)
			}
		})
		el.__qslidetoggle = store
	}

	if (store.uid) {
		stop(store.uid)
		return anim()
	}

	store.css = {
		overflowY: el.style.overflowY,
		maxHeight: el.style.maxHeight,
		padding: el.style.padding,
		margin: el.style.margin
	}
	let style = window.getComputedStyle(el)
	if (style.padding && style.padding !== '0px') {
		store.padding = parseSize(style.padding)
	}
	if (style.margin && style.margin !== '0px') {
		store.margin = parseSize(style.margin)
	}
	store.height = getHeight(el, style)
	store.pos = null
	el.style.overflowY = 'hidden'
	anim()
}


export default {
	props: {
		appear: Boolean
	},
	render(h) {
		return h('transition', {
			props: {
				mode: 'out-in',
				css: false,
				appear: this.appear
			},
			on: {
				enter(el, done) {
					toggleSlide(el, true, done)
				},
				leave(el, done) {
					toggleSlide(el, false, done)
				}
			}
		}, this.$slots.default)
	}
}
