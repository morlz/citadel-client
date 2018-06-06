<template>
<div class="LessonList">
	<lesson v-for="lesson, index in content" :key="lesson.id" :content="lesson"/>

	<div v-if="!content.length">
		Список пуст
	</div>

	<record-form v-model="regFormOpen"/>

	<q-inner-loading :visible="loading">
		<q-spinner size="50px" color="primary"/>
	</q-inner-loading>
</div>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import Lesson from '@/components/Lesson'
import RecordForm from '@/components/RecordForm'

export default {
	components: {
		Lesson,
		RecordForm
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('cource/lesson', {
			loading: state => state.loading.list
		}),
		regFormOpen: {
			get () {
				return this.$store.state.user.record.form.open
			},
			set (open) {
				this.$store.commit('user/record/formSet', { open })
			}
		}
	}
}
</script>

<style lang="stylus">
.LessonList
	display grid
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	justify-content center
	align-items start
	grid-gap 10px
	position relative
	min-height 100px
</style>
