<template>
	<div class="lessonsWrapper">
		<div class="tabs">
			<div class="head" v-if="isAdmin">
				<div class="tab" v-for="tab, index in tabs" @click="currentTab = tab.value" :class="{ selected: tab.value == currentTab }">{{ tab.name }}</div>
			</div>

			<div class="canOpenWrapper">
				<lesson v-for="lesson, index in lessonsToShow" :key="index" :content="lesson" ref="lessons"/>
				<div v-if="!lessonsToShow.length">В данный момент занятий нет</div>
			</div>
		</div>

		<add-lesson-form v-if="isAdmin" />
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import lesson from '@/components/lesson.vue'
import addLessonForm from '@/components/addLessonForm.vue'

import { tween, easing } from 'popmotion'
import api from '@/api'

export default {
	props: {
		courceId: {},
		scrollTo: {
			default: a => false
		}
	},
	data () {
		return {
			currentTab: "next",
			tabs: [
				{ name: "Предстоящие", value: "next" },
				{ name: "Все", value: "all" },
				{ name: "Без даты", value: "nodate" },
			],
			scrolled: false,
			scrollThrottle: false
		}
	},
	components: {
		addLessonForm,
		lesson
	},
	watch: {
		courceId () {
			this.load()
		},
		currentCourceLessons () {
			this.scrolled = false
			if (this.scrollTo)
				this.scroll(this.scrollTo)
		},
		scrollTo () {
			this.scrolled = false
			if (this.scrollTo)
				this.scroll(this.scrollTo)
		}
	},
	computed: {
		...mapGetters([
			'lessons',
			'isAdmin'
		]),
		currentCourceLessons () {
			return this.lessons.filter(el => el.id_cource == this.courceId) || []
		},
		lessonsToShow () {
			switch (this.currentTab) {
				case "next":
					let now = new Date().valueOf()
					return this.currentCourceLessons.filter(el => new Date(el.date).valueOf() >= now)
					break;
				case "all":
					return this.currentCourceLessons
					break;
				case "nodate":
					return this.currentCourceLessons.filter(el => el.date == null)
					break;
				default:
					return []
			}
		}
	},
	methods: {
		...mapActions([
			'getLectionsByCource'
		]),
		load () {
			if (this.courceId != undefined)
				this.getLectionsByCource( this.courceId )
		},
		scroll (id) {
			if (this.scrollThrottle)
				clearTimeout(this.scrollThrottle)

			this.scrollThrottle = setTimeout(a => this.scrollAnimation(id), 100)
		},
		async scrollAnimation (id) {
			await api.ready()
			if (!this.$refs.lessons)
				return setTimeout(a => this.scroll(id), 30)

			if (this.scrolled) return
			this.scrolled = true
			let lesson = this.$refs.lessons.find(el => el.content.id == id)
			if (!lesson) return
			if (!lesson.$el)
				return setTimeout(a => this.scroll(id), 30)

			let rect = lesson.$el.getBoundingClientRect()
			let to = document.documentElement.scrollTop + (rect.top - 100 > 0 ? rect.top - 100 : 0)
			let animation = tween({ from: document.documentElement.scrollTop, to, ease: easing.easeInOut })
			animation.start({
				update: v => document.documentElement.scrollTop = v,
				complete: a => lesson.opened = true
			})
		}
	},
	mounted () {
		this.load()
		if (this.scrollTo)
			this.scroll(this.scrollTo)
	}
}
</script>

<style lang="less">
.lessonsWrapper {
	.tabs {
		.head {
			margin: 20px 5px;
			background: #fff;
			height: 40px;
			display: grid;
			grid-auto-flow: column;
			justify-items: stretch;
			align-items: center;
			text-align: center;
			> div {
				border-bottom: 1px solid transparent;
				transition: all 0.3s ease-in-out;
				padding: 10px;
				box-sizing: border-box;
				cursor: pointer;
				&:hover {
					color: #448aff;
				}
			}
			.selected {
				border-bottom: 1px solid #448aff;
			}
		}
	}
}
</style>
