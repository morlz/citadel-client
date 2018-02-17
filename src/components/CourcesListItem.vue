<template>
	<collapsible class="courceTile">
		<h3 class="courceTile__title" slot="name">
			{{ content.title }}
		</h3>

		<div class="courceTile__description" slot="description" v-if="content.littleText">
			{{ content.littleText }}
		</div>

		<div class="courceTile__content" v-html="content.description" v-if="content.description"/>

		<div slot="right" v-if="content.logo">
			<img class="courceTile__logo" :src="content.logo">
		</div>

		<template slot="buttons">
			<router-link class="buttonTRb" :to="{ path: `/discipline/${content.id}` }">Подробнее о курсе</router-link>
		</template>
	</collapsible>
</template>

<script>
import Collapsible from '@/components/Collapsible.vue'

export default {
	props: {
		content: Object
	},
    components: {
		Collapsible
    },
}
</script>

<style lang="less">
.courceTile {
	&__title {
		color: #444;
		font-size: 24px;
		font-weight: 400;
		line-height: 20px;
		cursor: pointer;
	}

	&__description {
		color: #666;
		font-size: 14px;
		font-weight: 400;
		height: 19px;
		line-height: 16px;
		margin-top: 8px;
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__logo {
		width: 100%;
	}

	&__content {

	}
}
</style>
