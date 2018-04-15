<template>
	<q-carousel class="Gallery" arrows infinite quick-nav color="white">
		<q-carousel-slide class="Gallery__slide" v-for="image, index in images" :key="index">
			<img :src="image" class="Gallery__image"/>
		</q-carousel-slide>
	</q-carousel>
</template>

<script>
import { QCarousel, QCarouselSlide } from 'quasar'
export default {
	components: {
		QCarousel,
		QCarouselSlide
	},
	props: {
		images: Array
	},
}
</script>

<style lang="stylus">
.Gallery
	&__slide
		display grid
		align-items center
	&__image
		width 100%
</style>
