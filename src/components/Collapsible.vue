<template>
<div class="mz-collapsible" @click="open = !open" :class="{ 'mz-collapsible-open': opened }">
	<div class="mz-collapsible__header">
		<div class="mz-collapsible__title">
			<slot name="title">
				<div class="mz-collapsible__name">
					<slot name="name"/>
				</div>

				<div class="mz-collapsible__description" v-if="$slots.description">
					<slot name="description"/>
				</div>
			</slot>
		</div>

		<div class="mz-collapsible__headerRight" v-if="$slots.headerRight">
			<slot name="headerRight"/>
		</div>

		<div class="mz-collapsible__icon">
			<slot name="icon">
				<div class="mz-collapsible__iconArrow" :class="{ 'mz-collapsible__iconArrow-opened' : opened }"/>
			</slot>
		</div>
	</div>

	<slide-transition>
		<div class="mz-collapsible__content" v-show="opened" @click.stop>
			<div class="mz-collapsible__contentSide" v-if="$slots.left">
				<slot name="left"/>
			</div>

			<div class="mz-collapsible__contentMain">
				<slot/>
			</div>

			<div class="mz-collapsible__contentSide" v-if="$slots.right">
				<slot name="right"/>
			</div>
		</div>
	</slide-transition>

	<div class="mz-collapsible__buttons" v-if="$slots.buttonsOpen || $slots.buttons">
		<slide-transition>
			<slot name="buttonsOpen" v-if="opened"/>
		</slide-transition>
		<slot name="buttons"/>
	</div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import SlideTransition from '@/components/SlideTransition.js'

export default {
	props: ['value'],
    components: {
		SlideTransition
    },
	data () {
		return {
			open: false
		}
	},
	watch: {
		open (n) {
			this.$emit('input', n)
		},
		value (n) {
			this.open = n
		}
	},
	computed: {
		...mapGetters([

		]),
		opened () {
			if (this.value === undefined)
				return this.open

			return this.value
		}
	},
	methods: {
		...mapActions([

		]),
		...mapMutations([

		])
	},
}
</script>

<style lang="less">
.mz-collapsible {
	cursor: pointer;
	transition: all 0.4s ease-in-out;
	border-top: 1px solid transparent;
	border-bottom: 1px solid transparent;
	padding: 0 10px;

	&-open {
		padding: 20px 10px;
		border-top: 1px solid rgb(225, 225, 225);
		border-bottom: 1px solid rgb(225, 225, 225);
	}

	&__header {
		display: grid;
		grid-template-columns: 1fr max-content max-content;
		align-items: center;
	}

	&__iconArrow {
		width: 35px;
		height: 35px;
		margin-top: -20px;
		background: url("../assets/images/ARROW.svg") no-repeat 50% 50%;
		background-size: 25px;
		transition: all 0.4s ease-in-out;
		&-opened {
			margin-top: 50px;
			transform: rotateX(-180deg);
		}
	}

	&__content {
		padding: 10px 0;
		cursor: auto;
		display: grid;
		grid-auto-flow: column;
		grid-gap: 10px;
		align-content: space-around;
		justify-content: space-around;
		overflow-x: hidden;
	}

	&__contentSide {
		max-width: 300px;
	}

	&__buttons {
		padding: 10px;
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
		> div {
			display: grid;
			grid-auto-flow: column;
			justify-content: end;
			align-items: center;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
		}
	}
}

@media screen and (max-width: 993px) {
	.mz-collapsible {
		&__content {
			grid-auto-flow: row;
		}

		&__contentSide {
			max-width: none;
		}
	}
}

</style>
