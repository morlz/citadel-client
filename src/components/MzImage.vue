<template>
<div class="mz-image">
	<img :src="url" v-if="!edit" class="mz-image__img"/>
	<mz-image-select :content="value" v-if="edit" @save="updateUrl" :addbtn="button"/>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import MzImageSelect from '@/components/MzImageSelect.vue'

export default {
	props: {
		edit: Boolean,
		value: {
			type: String,
			default: a => ""
		},
		button: {
			type: Boolean,
			default: a => false
		},
	},
    components: {
		MzImageSelect
    },
	data () {
		return {}
	},
	computed: {
		...mapGetters([

		]),
		url () {
			// index === 0
			// найдено на 1 позиции
			if (!this.value.indexOf('src="'))
				return this.value.substr(5, this.value.length - 6)

			return this.value
		}
	},
	methods: {
		...mapActions([

		]),
		...mapMutations([

		]),
		updateUrl (e) {
			this.$emit('input', e)
		}
	},
}
</script>

<style lang="less">
.mz-image {
	width: 100%;
	&__img {
		width: 100%;
	}
}
</style>
