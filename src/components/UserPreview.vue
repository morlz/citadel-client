<template>
<q-card class="UserPreview" v-ripple @click.native="open">
	<q-card-media class="UserPreview__image">
		<img :src="content.avatar"/>
	</q-card-media>

	<q-card-title class="UserPreview__title">
		<div>{{ content.name | trim }}</div>

		<div slot="subtitle" class="UserPreview__email">
			<div>
				{{ content.email }}
			</div>

			<div>
				{{ content.role.name }}
			</div>
		</div>
	</q-card-title>

	<q-card-main v-html="content.shortDescription"/>
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
			this.timer = setTimeout(() => this.$router.push(`/user/${this.content.id}`), 300)
		}
	},
	filters: {
		trim (val) {
			return val.trim()
		}
	}
}
</script>

<style lang="stylus">
.UserPreview
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
		img
			position absolute
			transform translate(-50%, -50%)
			top 50%
			left 50%

	&__title
		position relative

	&__button
		position absolute
		top 0
		right 16px
		transform translateY(-50%)

	&__balance
		color gray
		i::before
			font-size 14px

	&__email
		color gray

</style>
