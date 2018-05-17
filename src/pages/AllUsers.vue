<template>
<q-page padding>
	<div class="AllUsers" v-if="isAdmin">
		<div class="AllUsers__search">
			<q-input v-model="search" float-label="Поиск"/>
		</div>

		<user-preview-list :content="filtredContent"/>
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

import UserPreviewList from '@/components/UserPreviewList'
import { AuthMixin, SearchMixin } from '@/mixins'

export default {
	components: {
		UserPreviewList
	},
	mixins: [AuthMixin, SearchMixin],
	data () {
		return {
			search: ''
		}
	},
	computed: {
		...mapState('user', {
			content: state => state.cached.list,
		}),
		filtredContent () {
			return this.basicSearch(this.content, this.search)
		}
	},
	methods: {
		...mapActions('user', [
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
.AllUsers
	position relative
	&__search
		margin 10px
</style>
