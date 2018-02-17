<template>
<div class="mz-image">
	<img :src="url" v-if="!edit" class="mz-image__img"/>
	<photo-select :content="url" v-if="edit" @save="updateUrl" :addbtn="button"/>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import PhotoSelect from '@/components/photoSelect.vue'

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
		PhotoSelect
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
