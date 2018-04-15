<template>
<div class="RecordList">
	<record v-for="nw, index in content" :key="nw.id" :content="nw"/>

	<div v-if="!content.length">
		Список пуст
	</div>

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

import Record from '@/components/Record'

export default {
	components: {
		Record
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('user/record', {
			loading: state => state.loading.list
		})
	}
}
</script>

<style lang="stylus">
.RecordList
	display grid
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	justify-content center
	align-items start
	grid-gap 10px
	position relative
	min-height 100px
</style>
