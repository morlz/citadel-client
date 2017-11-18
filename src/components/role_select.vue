<template>
	<div class="role_select">
		<input type="text" placeholder="Search" v-model="search">
		<div class="selectedRole selected" v-if="selectedRole"> {{ selectedRole }} </div>
		<ul class="roles" v-if="this.roleNames">
			<li v-if="searched.length" v-for="(role, index) in searched" @click="select(role.id)" class="mather" :class="{selected: isSelected(role.id)}" v-show="role.id"> {{ role.name }} </li>
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
import mixins from '@/components/mixins.vue'

export default {
    props: ['content'],
	mixins: [mixins],
    data() {
        return {
            search: ""
        }
    },
    methods: {
		select(role) {
			this.$emit('selected', role )
		},
		isSelected (roleId) {
			return roleId == this.content
		}
    },
	computed: {
		searched () {
			let setRoleNames = (el, index) => {
				return {
					id: index,
					name: this.roleName(index)
				}
			}

			if (!this.search.length) return this.roleNames.map(setRoleNames)

			return this.roleNames
				.map(setRoleNames)
				.filter(el => this.searchFn(el, this.search))
        },
		selectedRole () {
			return this.roleNames.find((el, index) => index == this.content)
		}
	}
}
</script>

<style lang="less">
	.role_select {
		position: relative;
		&:hover {
			> .roles {
				opacity: 1;
				pointer-events: all;
				z-index: 20;
			}
			> .selectedRole {
				opacity: 0;
				pointer-events: none;
			}
		}
		> input {
			width: 100%;
		}
		.selectedRole {
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
		.roles {
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
