<template>
	<router-link class="user_prev mather"
	:to="{ path: `/user/${data.id}` }"
	:class="{ noImage: !data.photo }"
	:style="{
		'background-image' : data.photo ? `url('${data.photo}')` : '',
		'width' : width || '100%'
		}">
		<h2 class="name"> {{ data.name }}</h2>
	    <div class="contactsWrapper">
	        <div class="contacts">
				<div class="phone">{{data.phone}}</div>
				<div class="email">{{data.email}}</div>
				<div class="role" :class="{ [roleIconClass(data.id_role)]: true }">{{ roleName(data.id_role) }}</div>
			</div>
			<div class="editButtons" v-if="edit">
				<div class="buttonTRb" @click="deleteUser($event, data.id)">Удалить</div>
			</div>
	    </div>
	</router-link>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import {
    default as mixins
} from '@/components/mixins.vue'

export default {
    props: ['id', 'width', 'user'],
	mixins: [mixins],
    methods: {
		...mapActions([
			'getUser',
			'remove'
		]),
		deleteUser(e, id){
			e.preventDefault()
			this.remove({
				type: 'user',
				id
			})
		}
    },
	watch: {
		edit(){
			this.$redrawVueMasonry()
		}
	},
	computed: {
		...mapGetters([
			'allUsers',
			'edit'
		]),
		data () {
			if (this.id) return this.allUsers.find(el => el.id == this.id) || {}
			if (this.user) return this.user || {}
		}
	},
	mounted () {
		if (this.id) this.getUser( this.id )
	}
}
</script>

<style lang="less">

.user_prev {
	text-decoration: none;
    background-color: #fff;
	background-size: 100%;
    transition: all 0.2s ease-in-out;
	color:#666;
	overflow: hidden;
	.name {
		margin: 350px 0 0 0;
        font-size: 26px;
        line-height: 26px;
        padding: 10px;
		background: #fff;
		white-space: nowrap;
    }
	.contacts {
		line-height: 40px;
		> div {
			width: 100%;
			box-sizing: border-box;
			min-height: 40px;
		}
	}
    .contactsWrapper {
        background: white;
        padding: 10px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
		.editButtons {
			display: flex;
			justify-content: flex-end;
			flex-direction: row;
		}
    }
    .b1 {
        justify-self: center;
    }
    .fadeContent-enter-active {
        transition: margin-top 0.3s ease-in-out, opacity 0.2s ease-in-out 0.15s;
    }
    .fadeContent-leave-active {
        transition: margin-top 0.3s ease-in-out 0.1s, opacity 0.2s ease-in-out;
    }
    .fadeContent-enter,
    .fadeContent-leave-to {
        opacity: 0;
        margin-top: -100%;
    }
}
</style>
