<template>
	<div class="prepod_select">
		<input type="text" placeholder="Search" v-model="search">
		<div class="selectedPrepod selected" v-if="selectedPrepod"> {{ selectedPrepod.name }} </div>
		<ul class="prepods" v-if="this.prepods">
			<li v-if="searched.length" v-for="(prep, index) in searched" @click="select(prep)" class="mather" :class="{selected: isSelected(prep)}"> {{ prep.name }} </li>
			<li v-if="!searched.length">Никого не найдено</li>
		</ul>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

export default {
    props: ['content'],
    data() {
        return {
            search: ""
        }
    },
    methods: {
		...mapActions([
			"getPrepods"
		]),
		select(prep) {
			this.$emit('selected', prep.id )
		},
		isSelected (prep) {
			return prep.id == this.content
		}
    },
	computed: {
		...mapGetters([
			'prepods'
		]),
		searched () {
			return this.prepods.filter(prepod => {
				let finded = false || !this.search.length
				for (var prop in prepod) {
					if (prepod.hasOwnProperty(prop)) {
						if (prepod[prop].toString().indexOf(this.search) + 1) finded = true
					}
				}
				return finded
			})
        },
		selectedPrepod () {
			return this.prepods.find(el => el.id == this.content)
		}
	},
	mounted () {
		this.getPrepods()
	}
}
</script>

<style lang="less">
	.prepod_select {
		position: relative;
		&:hover {
			> .prepods {
				opacity: 1;
				pointer-events: all;
				z-index: 20;
			}
			> .selectedPrepod {
				opacity: 0;
				pointer-events: none;
			}
		}
		.selectedPrepod {
			width: 100%;
			padding: 10px;
			top: 0;
			left: 0;
			position: absolute;
			opacity: 1;
			transition: all .3s ease-in-out;
			pointer-events: none;
			box-sizing: border-box;
			background: #fff;
		}
		.prepods {
			top: 100%;
			left: 0;
			width: 100%;
			padding: 0;
			margin: 0;
			position: absolute;
			opacity: 0;
			transition: all .3s ease-in-out;
			pointer-events: none;
			display: grid;
			grid-gap: 0;
			li {
				list-style: none;
				margin: 0;
				padding: 10px;
				background: #fff;
				border-radius: 3px;
				border: 1px solid rgba(0, 0, 0, 0);
				cursor: pointer;
			}
			.selected {
				border: 1px solid #448aff;
			}
		}
		.selected {
			border: 1px solid #448aff;
		}
	}
</style>
