<template>
	<div class="lessonListWrapper">
		<recordedUsers />
		<article>
			<h2>Список всех занятий</h2>
			<div class="searchWrapper">
				<input type="text" v-model="search" class="search mather" placeholder="Поиск">
			</div>
			<div class="lessonList">
				<div class="lesson mather">
					<div class="title">Название</div>
					<div class="cource">Курс</div>
					<div class="center">Центр</div>
					<div class="duration">Длительность</div>
					<div class="date">Дата</div>
					<div class="price">Цена</div>
				</div>
				<div class="lesson mather" v-for="lesson, index in searched" :class="{ old: new Date(lesson.date).valueOf() < new Date().valueOf() }" @click="showRegistredUsers( $event, lesson.id )">
					<div class="title">{{ lesson.title }}</div>
					<router-link class="cource" :to="{ path: `/cource/${lesson.cource.id}` }" v-if="lesson.cource">{{ lesson.cource.title }}</router-link>
					<div v-else="lesson.cource">...</div>
					<router-link class="center" :to="{ path: `/centers/${lesson.center.id}` }" v-if="lesson.center">{{ lesson.center.title }}</router-link>
					<div v-else="lesson.center">...</div>
					<div class="duration">{{ lesson.duration }}</div>
					<div class="date">{{ lesson.date }}</div>
					<div class="price">{{ lesson.price }}</div>
				</div>
			</div>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'
import mixins from '@/components/mixins.vue'
import recordedUsers from '@/components/recordedUsers.vue'


export default {
	data () {
		return {
			search: ""
		}
	},
	mixins: [mixins],
	components: {
		recordedUsers
	},
	methods: {
		...mapActions([
			'getAllLessons',
			'getRegistredUsersForCurrentLesson'
		]),
		...mapMutations([
			'showCurrentUsers'
		]),
		showRegistredUsers ( e, lessonId ) {
			e.stopPropagation()
			if (e.target.tagName == 'A') return
			this.showCurrentUsers()
			this.getRegistredUsersForCurrentLesson( lessonId )
		},
		stopProp (e) {
			e.stopPropagation()
		}
	},
	computed: {
		...mapGetters([
			'edit',
			'quillOptions',
			'lessons'
		]),
		searched () {
			let search = (el, q) => {
				return this.searchFn(el, q)
			}

			if (!this.search.length) {
				return this.lessons.sort(this.sortByDate).reverse()
			}
			return this.lessons.filter(el => search(el, this.search)).sort(sortByDate).reverse()
		}
	},
	mounted () {
		this.getAllLessons()
	}
}
</script>

<style lang="less">
	.lessonListWrapper {
		article {
			display: grid;
			justify-content: stretch;
			.search {
				background-image: url("../assets/images/ic_search_black_24px.svg");
				background-position: 97% 50%;
				background-repeat: no-repeat;
				padding: 15px 40px 15px 20px;
				justify-self: center;
				margin: 10px;
				width: 300px;
				background-color: #fff;
				border-bottom: 1px solid transparent;
				&:focus {
					border-bottom: 1px solid transparent;
				}
			}
			.searchWrapper {
				display: grid;
				grid-auto-flow: column;
				grid-gap: 10px;
				justify-content: center;
				.tooltip {
					width: 45px;
					height: 45px;
					background-color: #fff;
					background-position: center;
					padding: 0;
					margin: 10px 0;
				}
			}
		}
		.lessonList {
			width: 100%;
			.lesson {
				&:not(:first-child) {
					cursor: pointer;
				}
				padding: 5px 10px;
				align-items: center;
				display: grid;
				grid-auto-flow: column;
				grid-template-columns: 1fr 1fr 1fr 120px 100px 60px;
				margin-bottom: 5px;
				background: #fff;
				> div {
					overflow: hidden;
				}
				a {
					color: inherit;
				}
			}
			.old {
				opacity: 0.6;
				transition: all 0.3s ease-in-out;
				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
