<template>
	<div class="selectWithSearch">
		<input type="text" placeholder="Search" v-model="search">
		<div class="currentSelected" v-if="selected"> {{ label(selected) }} </div>
		<ul class="items" v-if="data">
			<li v-if="searched.length" v-for="item, index in searched" @click="select(item)" class="mather" :class="{selected: isSelected(item)}"> {{ label(item) }} </li>
			<li v-if="!searched.length">Данных нет</li>
		</ul>
	</div>
</template>

<script>
import mixins from '@/components/mixins.vue'

export default {
    props: ['value', 'data', 'proplabel'],
	mixins: [mixins],
    data() {
        return {
            search: ""
        }
    },
    methods: {
		select(data) {
			this.$emit('select', data )
		},
		isSelected (data) {
			return data.id == this.value
		},
		label (item) {
			return item[this.proplabel || 'name']
		}
    },
	computed: {
		searched () {
			if (!this.search.length) return this.data
			return this.data.filter(el => this.searchFn(el, this.search))
        },
		selected () {
			return this.data.find(el => el.id == this.value)
		}
	}
}
</script>

<style lang="less">
	.selectWithSearch {
		position: relative;
		input {
			width: 100%;
			box-sizing: border-box;
		}
		&:hover {
			> .items {
				opacity: 1;
				pointer-events: all;
				z-index: 20;
			}
			> .currentSelected {
				opacity: 0;
				pointer-events: none;
			}
		}
		.currentSelected {
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
		.items {
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
				transition: all 0.3s ease-in-out;
				&:hover {
					color: #4285f4;
				}
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
