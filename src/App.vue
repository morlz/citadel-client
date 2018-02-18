<template>
<div id="app">
	<main-styles />
	<alert />
	<main-header />
	<transition name="pageChange" mode="out-in">
		<router-view :key="$route.name + ($route.params.id || '')" class="contentWrapper" />
	</transition>
	<main-footer />
</div>
</template>

<script>
import mainStyles 	from '@/components/mainStyles.vue'
import mainHeader 	from '@/components/header.vue'
import mainFooter 	from '@/components/footer.vue'
import alert 		from '@/components/alert.vue'


export default {
	name: 'app',
	components: {
		mainStyles,
		mainHeader,
		mainFooter,
		alert
	},
	mounted () {
		this.$store.dispatch('app_init')
	}
}
</script>

<style>

</style>
