<template>
<q-card class="CourcePreview" v-ripple @click.native="open">
	<q-card-media class="CourcePreview__image" :style="{ backgroundImage: `url(${content.avatar})` }"/>

	<q-card-title>
		{{ content.title }}
		<div slot="subtitle" v-html="content.littleText"/>
	</q-card-title>

	<q-card-main class="CourcePreview__description" v-html="content.shortDescription"/>
</q-card>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

export default {
	props: {
		content: Object
	},
	data () {
		return {
			timer: false
		}
	},
	methods: {
		open () {
			if (this.timer) return
			this.timer = setTimeout(() => this.$router.push(`/cource/${this.content.id}`), 300)
		}
	},
}
</script>

<style lang="stylus">
.CourcePreview
	background white
	width auto
	height 480px
	text-overflow ellipsis
	overflow hidden
	position relative
	cursor pointer
	user-select none

	&__image
		height 300px
		position relative
		background-position center
		background-repeat no-repeat
		background-size cover

</style>
