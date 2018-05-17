<template>
<q-page>
	<div class="AllLessons">
		<div class="AllLessons__search">
			<q-input v-model="search" float-label="Поиск"/>
		</div>

		<div class="AllLessons__content">
			<infinite-table
				:rows="filtredContent"
				:columns="columns"
				no-infinite
			/>
		</div>



		<q-inner-loading :visible="loading">
			<q-spinner size="50px" color="primary"/>
		</q-inner-loading>
	</div>
</q-page>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import LessonList from '@/components/LessonList'
import { AuthMixin, SearchMixin } from '@/mixins'
import InfiniteTable from '@/components/InfiniteTable'
import sortFnFactory from '@/api/sortFnFactory'
import moment from 'moment'

const dateSort = sortFnFactory(item => moment(item.date).valueOf())

export default {
	components: {
		LessonList,
		InfiniteTable
	},
	mixins: [AuthMixin, SearchMixin],
	data () {
		return {
			search: '',
			columns: [
				{ field: 'id', label: 'id' },
				{ field: 'title', label: 'Название' },
				{ field: 'price', label: 'Цена', width: 60 },
				{ field: 'registred', label: 'Записано', width: 40 },
				{ field: 'space', label: 'Мест', width: 40 },
				{ field: 'duration', label: 'Время' },
				{ field: 'date', label: 'Дата' },
				{ field: 'worker.name', label: 'Преподаватель' },
				{ field: 'cource.title', label: 'Курс' },
				{ field: 'center.title', label: 'Центр' },
			]
		}
	},
	computed: {
		...mapState('cource/lesson', {
			content: state => [...state.cached.list].sort( sortFnFactory( item => moment(item.date).isValid() ? moment(item.date).valueOf() : 0 ) ),
			loading: state => state.loading.list,
		}),
		filtredContent () {
			return this.basicSearch(this.content, this.search)
		}
	},
	methods: {
		...mapActions('cource/lesson', [
			'getAll'
		])
	},
	async created () {
		if (!this.adminPage()) return
		await this.getAll()
	},
}
</script>

<style lang="stylus">
.AllLessons
	position relative
	padding 10px

	&__content
		height calc(100vh - 120px)
</style>
