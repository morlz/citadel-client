<template>
	<router-link class="userMini mather" :to="{ path: `/user/${data.id}` }" v-if="data.id">
		<div
			class="userMini__image"
			:style="{ backgroundImage: image ? `url('${image}')` : ''}"
			:class="{ noImage: !image }"/>
		<div class="userMini__name"> {{ data.name }}</div>
	</router-link>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import mixins from '@/components/mixins.vue'

export default {
    props: ['id', 'user'],
	mixins: [mixins],
    methods: {
		...mapActions([
			'getUser'
		]),
    },
	computed: {
		...mapGetters([
			'allUsers'
		]),
		data () {
			if (this.id) return this.allUsers.find(el => el.id == this.id) || {}
			if (this.user) return this.user || {}
			return {}
		},
		image () {
			if (this.data.photo && !this.data.photo.indexOf('src="'))
				return this.data.photo.substr(5, this.data.photo.length - 6)

			return this.data.photo
		}
	},
	mounted () {
		if (this.id) this.getUser( this.id )
	}
}
</script>

<style lang="less">

.userMini {
	display: grid;
	grid-auto-flow: column;
	grid-gap: 10px;
	justify-content: start;
	height: 50px;
	background: #fff;
	color: #000;
	text-decoration: none;

	&__image {
		width: 50px;
		height: 50px;
		background-size: cover;
		background-position: center;
	}

	&__name {
		height: 50px;
		line-height: 30px;
		white-space: nowrap;
		box-sizing: border-box;
		padding: 10px;
	}
}
</style>
