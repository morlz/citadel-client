<template>
	<div class="lessonsWrapper">
		<div class="tabs">
			<div class="head" v-if="isAdmin">
				<div class="tab" v-for="tab, index in tabs" @click="currentTab = tab.value" :class="{ selected: tab.value == currentTab }">{{ tab.name }}</div>
			</div>

			<div class="canOpenWrapper">
				<lesson v-for="lesson, index in lessonsToShow" :key="index" :content="lesson" />
				<div v-if="!lessonsToShow.length">В данный момент занятий нет</div>
			</div>
		</div>

		<add-lesson-form />
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

export default {
	props: ["courceId"],
	data () {
		return {
			currentTab: "next",
			tabs: [
				{ name: "Предстоящие", value: "next" },
				{ name: "Все", value: "all" },
				{ name: "Без даты", value: "nodate" },
			]
		}
	},
	components: {
		addLessonForm,
		lesson
	},
	watch: {
		courceId () {
			this.load()
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
			if (this.courceId != undefined) this.getLectionsByCource( this.courceId )
		}
	},
	mounted () {
		this.load()
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
