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

		<q-btn class="Lesson__reg" color="primary" round icon="add" v-if="!content.registred || !isUser" @click="reg">
			<q-tooltip :offset="[0, 10]">
				Записаться
			</q-tooltip>
		</q-btn>

		<q-btn class="Lesson__reg" color="primary" round icon="done" v-if="content.registred"/>

		<q-btn class="Lesson__reg" :color="buttonHover ? 'negative' : 'primary'" round :icon="buttonHover ? 'fa-ban' : 'done'" v-if="content.registred && false" @mouseenter.native="buttonHover = true" @mouseleave.native="buttonHover = false">
			<q-tooltip :offset="[0, 10]">
				Вы записаны. Отменить регистрацию?
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
import { AuthMixin } from '@/mixins'

export default {
	components: {
		QCardSeparator
	},
	mixins: [AuthMixin],
	props: {
		content: Object
	},
	data () {
		return {
			buttonHover: false
		}
	},
	computed: {
		...mapGetters('auth', [
			'logined'
		]),
		regFormOpen: {
			get () {
				return this.$store.state.user.record.form.open
			},
			set (open) {
				this.$store.commit('user/record/formSet', { open, bufferLesson: this.content })
			}
		}
	},
	methods: {
		reg () {
			if (!this.logined)
				return this.$store.dispatch('notify/alert', 'Войдите в аккаунт для того чтобы записаться!')

			this.regFormOpen = !this.regFormOpen
		}
	}
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
