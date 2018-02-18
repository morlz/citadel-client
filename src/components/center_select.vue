<template>
	<div class="center_select">
		<input type="text" placeholder="Search" v-model="search">
		<div class="selectedCenter selected" v-if="selectedCenter"> {{ selectedCenter.title }} </div>
		<ul class="centers" v-if="this.centerList">
			<li v-if="searched.length" v-for="(cent, index) in searched" @click="select(cent)" class="mather" :class="{selected: isSelected(cent)}"> {{ cent.title }} </li>
			<li v-if="!searched.length">Нет центров</li>
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
    props: {
		content: {},
		value: {},
		allowNull: {
			type: Boolean,
			dafault: a => false
		}
	},
    data() {
        return {
            search: ""
        }
    },
    methods: {
		...mapActions([
			"getCenters"
		]),
		select(cent) {
			this.$emit('selected', cent.id )
			this.$emit('input', cent.id )
		},
		isSelected (cent) {
			return cent.id == this.content || cent.id == this.value
		}
    },
	computed: {
		...mapGetters([
			'centers'
		]),
		centerList () {
			if (!this.allowNull) return this.centers
			return [{ title: "Не выбран", id: "" }, ...this.centers]
		},
		searched () {
			return this.centerList.filter(center => {
				let finded = false || !this.search.length
				for (var prop in center) {
					if (center.hasOwnProperty(prop) && center[prop]) {
						if (center[prop].toString().indexOf(this.search) + 1) finded = true
					}
				}
				return finded
			})
        },
		selectedCenter () {
			return this.centerList.find(el => el.id == this.content || el.id == this.value)
		}
	},
	mounted () {
		this.getCenters()
	}
}
</script>

<style lang="less">
	.center_select {
		position: relative;
		&:hover {
			> .centers {
				opacity: 1;
				pointer-events: all;
				z-index: 20;
			}
			> .selectedCenter {
				opacity: 0;
				pointer-events: none;
			}
		}
		input {
			width: 100%;
			box-sizing: border-box;
		}
		.selectedCenter {
			width: 100%;
			padding: 10px;
			top: -5px;
			left: 0;
			position: absolute;
			opacity: 1;
			transition: all .3s ease-in-out;
			pointer-events: none;
			box-sizing: border-box;
			background: #fff;
		}
		.centers {
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
