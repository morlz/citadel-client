<template>
<q-card class="Lesson">
	<q-card-title class="Lesson__title">
		{{ content.title }}
		<div slot="subtitle">
			<div class="">
				<q-icon name=""/> {{ content.textDateTimeFromNow }}
			</div>

			<div class="">
				Продолжительность: {{ content.textDuration }} ({{ content.duration }} мин.)
			</div>
		</div>

		<div slot="right" class="">
			<div>
				{{ content.registred }} / {{ content.space }} <q-icon name="fa-handshake"/>
				<q-tooltip :offset="[0, 10]">
					Занятые места
				</q-tooltip>
			</div>

			<div>
				{{ content.price }} <q-icon name="fa-ruble-sign"/>
			</div>
		</div>

		<q-btn class="Lesson__reg" color="primary" round icon="add">
			<q-tooltip :offset="[0, 10]">
				Записаться
			</q-tooltip>
		</q-btn>
	</q-card-title>

	<q-card-separator/>

	<q-card-main>
		<div class="Lesson__info">
			<div class="">
				<q-icon name="date_range"/> {{ content.textDate }} <span>{{ content.textDayOfWeek }}</span>
			</div>

			<div class="">
				<q-icon name="access_time"/> {{ content.textTime }}
			</div>

			<div class="">
				<q-icon name="location_on"/> {{ content.center.title }}
			</div>
		</div>
	</q-card-main>

	<template v-if="content.description">
		<q-card-separator />

		<q-card-main class="Lesson__description" v-html="content.description"/>
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
}
</script>

<style lang="stylus">
.Lesson
	background white
	width auto
	text-overflow ellipsis
	overflow hidden
	min-height 240px
	position relative
	cursor pointer
	user-select none

	&__title
		position relative
		min-height 110px
		margin-bottom 1px

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
