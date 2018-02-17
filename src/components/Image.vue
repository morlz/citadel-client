<template>
<div class="mz-image">
	<img src="url" v-if="!url"/>
	<photo-select :content="url" v-if="edit" @save="updateUrl" />
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
		value: String
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

}
</style>
