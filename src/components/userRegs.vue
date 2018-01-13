<template>
	<div class="regs mather">
		<user-reg :key="index+'-'+reg.id" :content="reg" v-for="reg, index in currentUserRegs" />
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import userReg from '@/components/userReg.vue'

export default {
	props: ['userId'],
	components: {
		userReg
	},
	watch: {
		userId () {
			this.load()
		}
	},
	computed: {
		...mapGetters([
			'currentUserRegs',
			'user',
			'isAdmin',
			'paymentTypes',
			'registerTypes'
		]),
	},
	methods: {
		...mapActions([
			'getUserRegs',
			'getPaymentTypes',
			'getRegisterTypes',
		]),
		load () {
			if (this.userId == undefined) return
			if ((this.user.id == this.userId) || this.isAdmin) {
				this.getUserRegs( this.userId )
				this.local_getTypes()
			}
		},
		local_getTypes () {
			if (!this.isAdmin) return
			if (!this.paymentTypes.length)
				this.getPaymentTypes()

			if (!this.registerTypes.length)
				this.getRegisterTypes()
		}
	},
	mounted () {
		this.load()
	}
}
</script>

<style lang="less">

</style>
