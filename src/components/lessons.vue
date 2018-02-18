<template>
	<div class="lessonsWrapper">
		<div class="tabs">
			<div class="head mather" v-if="isAdmin">
				<div class="tab" v-for="tab, index in tabsDate" @click="currentDate = tab.value" :class="{ selected: tab.value == currentDate }">{{ tab.name }}</div>
			</div>

			<div class="head mather" v-if="isAdmin">
				<div class="tab" v-for="tab, index in tabsCenter" @click="currentCenter = tab.value" :class="{ selected: tab.value == currentCenter || tab.value == 'center' && +currentCenter }">{{ tab.name }}</div>
			</div>

			<div class="head mather" v-if="currentCenterShow">
				<center-select v-model="currentCenterModel" allow-null/>
			</div>


			<div class="canOpenWrapper mather">
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

import CenterSelect from '@/components/center_select.vue'

import { tween, easing } from 'popmotion'
import api from '@/api'

export default {
	props: {
		courceId: {},
		scrollTo: {
			default: a => false
		}
	},
	components: {
		addLessonForm,
		lesson,
		CenterSelect
	},
	data () {
		return {
			currentDate: "next",
			currentCenter: "center",
			tabsDate: [
				{ name: "Все", value: "all" },
				{ name: "Предстоящие", value: "next" },
				{ name: "Прошедшие", value: "prev" },
				{ name: "С датой", value: "date" },
				{ name: "Без даты", value: "nodate" },
			],
			tabsCenter: [
				{ name: "Все", value: "all" },
				{ name: "Без центра", value: "nocenter" },
				{ name: "С центром", value: "center" },
			],
			scrolled: false,
			scrollThrottle: false
		}
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
			'isAdmin',
			'lessonFilter'
		]),
		currentCourceLessons () {
			return this.lessons.filter(el => el.id_cource == this.courceId) || []
		},
		filtredByDate () {
			switch (this.currentDate) {
				case "all":
					return this.currentCourceLessons
					break;
				case "next":
					let now = new Date().valueOf()
					return this.currentCourceLessons.filter(el => new Date(el.date).valueOf() >= now)
					break;
				case "prev":
					return this.currentCourceLessons.filter(el => new Date(el.date).valueOf() < now)
					break;
				case "date":
					return this.currentCourceLessons.filter(el => el.date != null && el.date != "0000-00-00 00:00:00")
					break;
				case "nodate":
					return this.currentCourceLessons.filter(el => el.date == null || el.date == "0000-00-00 00:00:00")
					break;
				default:
					return []
			}
		},
		filtredBySenter () {
			switch (this.currentCenter) {
				case "all":
					return this.filtredByDate
					break;
				case "center":
					return this.filtredByDate.filter(el => el.id_center !== null)
					break;
				case "nocenter":
					return this.filtredByDate.filter(el => el.id_center === null)
					break;
				default:
					return this.filtredByDate.filter(el => el.id_center === this.currentCenter)
			}
		},
		filtredByDateRange () {
			if (!this.lessonFilter.date || this.lessonFilter.date.length !== 2)
				return this.filtredBySenter

			return this.filtredBySenter.filter(el => {
				if (!el.date || el.date == "0000-00-00 00:00:00") return
				if (new Date(el.date).valueOf() < new Date(this.lessonFilter.date[0]).valueOf()) return
				if (new Date(el.date).valueOf() > new Date(this.lessonFilter.date[1]).valueOf()) return
				return true
			})
		},
		lessonsToShow () {
			return this.filtredByDateRange
		},
		currentCenterShow () {
			return this.currentCenter != 'all' && this.currentCenter != 'nocenter'
		},
		currentCenterModel: {
			get () {
				if (this.currentCenter == 'center') return ""
				return this.currentCenter
			},
			set (n) {
				this.currentCenter = n ? n : 'center'
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
			> .tab {
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
