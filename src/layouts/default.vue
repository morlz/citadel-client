<template>
<q-layout view="lHh Lpr lFf">
	<q-layout-header>
		<q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
			<q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
				<q-icon name="menu" />
			</q-btn>

			<q-toolbar-title>
				Quasar App
				<div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
			</q-toolbar-title>
		</q-toolbar>
	</q-layout-header>

	<q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
		<app-menu-profile/>
		<app-menu/>
	</q-layout-drawer>

	<q-page-container>
		<router-view />
	</q-page-container>
</q-layout>
</template>

<script>
import { mapActions } from 'vuex'

import AppMenu from '@/components/AppMenu'
import AppMenuProfile from '@/components/AppMenuProfile'

export default {
	components: {
		AppMenu,
		AppMenuProfile
	},
	name: 'LayoutDefault',
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop
		}
	}
}
</script>

<style>
</style>
