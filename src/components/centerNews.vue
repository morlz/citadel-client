<template>
	<div class="news">
		<oneCenterNew v-for="one, index in data" :key="index" :content="one" :open="one.id == open" />
		<router-link :to="{ path: `/centers/${$route.params.id}` }" class="backButton" :class="{ backButtonActive: open }" />
		<div v-if="!data.length">Новостей нет</div>
	</div>
</template>

<script>
import mixins from '@/components/mixins.vue'
import oneCenterNew from '@/components/oneCenterNew.vue'

export default {
	props: ['content', 'open'],
	mixins: [mixins],
	components: {
		oneCenterNew
	},
	data () {
		return {}
	},
	computed: {
		data () {
			return this.content.sort(this.sortByDate).reverse()
		}
	}
}
</script>

<style lang="less">

.news {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr) );
	grid-gap: 15px;
	.backButton {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
		z-index: 5;
	}
	.backButtonActive {
		opacity: 1;
		pointer-events: all;
	}
}

</style>
