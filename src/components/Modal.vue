<template>
<transition name="pageChange">
	<div class="mz-modal" v-if="value" @click="close">
		<div class="mz-modal__inner" :class="{ 'mz-modal__inner-mobile': app_view_mobile }" @click.stop>
			<div class="mz-modal__header" :class="{ 'mz-modal__header-mobile': app_view_mobile }">
				<slot name="header">
					<div/>
				</slot>
				<i class="material-icons mz-modal__closeButton" @click="close">close</i>
			</div>

			<div class="mz-modal__content">
				<slot/>
			</div>

			<div class="mz-modal__buttons">
				<slot name="buttons"/>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

export default {
	props: {
		value: {
			type: Boolean,
			default: a => false
		}
	},
    components: {

    },
	data () {
		return {}
	},
	computed: {
		...mapGetters([
			'app_view_mobile'
		])
	},
	methods: {
		...mapActions([

		]),
		...mapMutations([

		]),
		close () {
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="less">
.mz-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 2000;

	&:hover {
		cursor: pointer;
	}

	&__inner {
		position: absolute;
		top: 5%;
		left: 5%;
		width: 90%;
		height: 90%;
		background: #fff;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 50px 1fr min-content;
		cursor: auto;
		&-mobile {
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	&__header {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-between;
		max-height: 50px;
		align-items: center;
		> div:nth-child(1) {
			padding: 10px;
			font-size: 24px;
		}
		&-mobile {
			> div:nth-child(1) {
				padding: 5px;
				font-size: 16px;
			}
		}
	}

	&__content {
		margin: 0 10px;
		padding: 10px;
		overflow-y: auto;
	}

	&__buttons {
		max-height: 50px;
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
		padding: 0 10px;
		box-sizing: border-box;
	}

	&__closeButton {
		width: 50px;
		height: 50px;
		padding: 5px;
		box-sizing: border-box;
		user-select: none;
		font-size: 40px;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		&:hover {
			color: #448aff;
		}
	}
}
</style>
