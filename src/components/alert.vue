<template>
	<div class="alertWrapper" :class="{alertWrapperActive: alertShow}">
		<div class="alert mather">
			<div class="content">{{ data.content }}</div>
			<div class="buttons">
				<div class="buttonTRb" v-for="button in buttons" @click="buttonClicked(button.event)">{{ button.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    methods: {
		...mapActions([
			'remove',
			'alertHide'
		]),
		buttonClicked(e){
			this.alertHide()
			if (e) e()
		}
    },
	computed: {
		...mapGetters([
			'edit',
			'alertShow',
			'alertContent'
		]),
		data () {
			return this.alertContent
		},
		buttons () {
			return this.alertContent.buttons ? this.alertContent.buttons : [{name: 'ok'}]
		}
	}
}
</script>

<style lang="less">
	.alertWrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 30;
		pointer-events: none;
		background: transparent;
		transition: all 0.3s ease-in-out;
		background: rgba(0, 0, 0, 0.5);
		display: grid;
		justify-items: center;
		align-items: center;
		opacity: 0;
		.alert {
			padding: 30px;
			background: #fff;
			.content {
				padding: 10px;
				margin: 10px;
			}
			.buttons {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	.alertWrapperActive {
		pointer-events: all;
		opacity: 1;
	}
</style>
