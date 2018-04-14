<template>
<q-layout view="lHh Lpr lFf">
	<q-ajax-bar :delay="200"/>

	<q-layout-header>
		<q-toolbar color="primary">
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
		<q-scroll-area :style="{ height: '100vh' }">
			<app-menu-profile/>
			<app-menu/>
		</q-scroll-area>
	</q-layout-drawer>

	<q-page-container>
		<!--
		<transition
			mode="out-in"
			appear
			enter-active-class="animated zoomInDown"
			leave-active-class="animated zoomOutDown">

		</transition>
		-->
		<router-view :key="$route.fullPath"/>
	</q-page-container>
</q-layout>
</template>

<script>
import { mapActions } from 'vuex'

import AppMenu from '@/components/AppMenu'
import AppMenuProfile from '@/components/AppMenuProfile'
import { QScrollArea, QAjaxBar } from 'quasar'

export default {
	components: {
		QScrollArea,
		AppMenu,
		AppMenuProfile,
		QAjaxBar
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
