<template>
	<q-card class="Record">
		<q-card-title class="Record__title">
			{{ content.lesson.title }}
			<div slot="subtitle" class="Record__subtitle">
				<q-icon :name="content.statusIcon"/> <span>{{ content.status }}</span>
			</div>

			<div slot="right">
				{{ content.lesson.price }} <q-icon name="fa-ruble-sign"/>
			</div>

			<q-btn class="Record__reg" color="primary" round icon="fa-ruble-sign" v-if="content.canPayed">
				<q-tooltip :offset="[0, 10]">
					Оплатить
				</q-tooltip>
			</q-btn>
		</q-card-title>

		<q-card-separator/>

		<q-card-main>
			<div class="Record__info">
				<div>
					<q-icon name="date_range"/> {{ content.lesson.textDate ? content.lesson.textDate : '???' }} <span>{{ content.lesson.textDayOfWeek }}</span>
				</div>

				<div>
					<q-icon name="access_time"/> {{ content.lesson.textTime ? content.lesson.textTime : '???' }}
				</div>
			</div>
		</q-card-main>

		<template v-if="content.lesson.description">
			<q-card-separator />

			<q-card-main class="Record__description" v-html="content.lesson.description"/>
		</template>

		<template v-if="content.comment">
			<q-card-separator />

			<q-card-main class="Record__comment" v-html="content.comment"/>
		</template>
	</q-card>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import { QCardSeparator } from 'quasar'

export default {
	components: {
		QCardSeparator
	},
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
			this.timer = setTimeout(() => this.$router.push(`/record/${this.content.id}`), 300)
		}
	}
}
</script>

<style lang="stylus">
.Record
	background white
	width auto
	text-overflow ellipsis
	overflow hidden
	position relative
	cursor pointer
	user-select none

	&__title
		position relative

	&__reg
		position absolute
		bottom 0
		right 16px
		transform translateY(50%)

	&__info
		display grid
		grid-gap 10px
		div
			font-size 14px
			span
				text-transform capitalize
			i
				font-size 24px
</style>
