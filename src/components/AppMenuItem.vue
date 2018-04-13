<template>
	<q-item
		class="AppMenuItem"
		v-if="!this.content.hasChilds"
		@click.native="open(content.path)">
		<q-item-side :icon="content.icon" :avatar="content.avatar"/>
		<q-item-main :label="content.name" :sublabel="content.description" />
	</q-item>

	<q-collapsible
		class="AppMenuItem"
		v-else
		:opened="initial"
		:icon="content.icon"
		:label="content.name"
		:style="{ pointerEvents: initial ? 'none' : 'auto' }"
		:sublabel="content.description">
		<q-list no-border link inset-delimiter :style="{ pointerEvents: 'auto' }">
			<app-menu-item v-for="menuItem, index in content.childs" :key="menuItem.name + index" :content="menuItem"/>
		</q-list>
	</q-collapsible>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

export default {
	name: 'AppMenuItem',
	props: {
		content: Object,
		initial: Boolean
	},
	methods: {
		open (url) {
			this.$router.push(url)
		}
	},
}
</script>

<style lang="stylus">
.AppMenuItem
	user-select none
	transition background .2s ease-in-out
</style>
