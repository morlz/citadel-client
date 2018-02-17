<template>
	<div class="courcesList">
		<cources-list-item v-for="(cource, index) in content" :content="cource" :key="index"/>
	</div>
</template>

<script>
import CourcesListItem from '@/components/CourcesListItem.vue'

export default {
	props: {
		content: Array
	},
    components: {
		CourcesListItem
    },
}
</script>

<style lang="less">

</style>
