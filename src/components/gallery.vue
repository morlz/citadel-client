<template>
<div class="galleryWrapper">
	<div class="gallery">
		<gallery v-if="imagesLocal && imagesLocal.length" :images="imagesLocal" :index="index" @close="index = null"></gallery>

		<carousel
			v-if="imagesLocal && imagesLocal.length"
			:perPage="1"
			:scrollPerPage="true"
			:navigationEnabled="true"
			paginationActiveColor="#448aff"
			paginationColor="#bbb"
			:paginationSize="10"
			easing="ease"
			:speed="350"
			navigationNextLabel=""
			navigationPrevLabel=""
			:perPageCustom="perPageCustom"
			>

			<slide v-for="image, imageIndex in imagesLocal" :key="imageIndex">
				<div class="previewImage" @click="index = imageIndex" :style="{'background-image' : image ? `url('${image}')` : 'none'}">
					<div class="remove button" @click="removeImage($event, imageIndex)" v-if="edit">Удалить</div>
				</div>
			</slide>
		</carousel>

		<div v-if="edit">
			<h3>Добавить изображение</h3>
			<photoSelect :content="addImageSrc" @save="addImage" :addbtn="1"></photoSelect>
		</div>

	</div>
</div>
</template>

<script>
import VueGallery from 'vue-gallery'
import photoSelect from '@/components/photoSelect.vue'
import {
    mapActions,
    mapGetters
} from 'vuex'
import { Carousel, Slide } from 'vue-carousel';

export default {
    props: ['images', 'perpage'],
    data() {
        return {
            index: null,
			addImageSrc: ""
        };
    },
    components: {
        'gallery': VueGallery,
		Carousel,
    	Slide,
		photoSelect
    },
	methods: {
		addImage(newImage){
			this.$emit("imagesChanged", [...this.imagesLocal, newImage])
		},
		removeImage(e, index) {
			e.stopPropagation()
			this.$emit("imagesChanged", this.imagesLocal.filter((el, i) => i != index))
		}
	},
	computed: {
		...mapGetters([
			'edit'
		]),
		imagesLocal () {
			if (typeof this.images == 'string') return JSON.parse(this.images)
			return this.images
		},
		perPageCustom () {
			if (this.perpage) return this.perpage
			return [[500, 2], [650, 3], [800, 1], [1000, 2], [1250, 3], [1400, 3], [1800, 4]]
		}
	}
}
</script>

<style lang="less">

.galleryWrapper {
	width: 100%;
	.gallery {
		width: 100%;
		padding: 5px 50px;
		box-sizing: border-box;
		.previewImage {
			width: 150px;
			height: 150px;
			margin: 10px;
			background-size: cover;
			background-position: center;
			position: relative;
			.remove {
				position: absolute;
				bottom: 0px;
				left: 35px;
				user-select: none;
				pointer-events: none;
				opacity: 0;
				transition: all 0.3s ease-in-out;
			}
			&:hover > .remove {
				pointer-events: all;
				opacity: 1;
				bottom: 5px;
			}
		}
	}
}


.VueCarousel {
	width: 100%;
	&:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
}
.VueCarousel-dot-inner {
	transition: all 0.3s ease-in-out;
}
.VueCarousel-navigation-button {
	display: block;
	width: 50px;
	height: 50px;
	box-sizing: border-box;
	color: #fff;
	fill: #707070;
	background: #fff;
	border-radius: 35px;
	box-shadow: 0px 2px 7px 1px rgba(0,0,0,0.2);
	transition: all 0.3s ease-in-out;
	&:hover:not(.VueCarousel-navigation--disabled) {
		margin-top: 2px;
		box-shadow: 0px 4px 15px 0px rgba(0,0,0,0.18);
	}
}
.VueCarousel-navigation-prev {
	background: url("./img/arrowL.svg") no-repeat 40% 50%;
	background-size: 50%;
	margin-left: -10px;
}
.VueCarousel-navigation-next {
	background: url("./img/arrowR.svg") no-repeat 50% 50%;
	background-size: 50%;
	margin-right: -10px;
}


</style>
