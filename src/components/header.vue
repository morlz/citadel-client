<template>
<header>
	<div class="editMode" @click="toggleEdit" v-if="isAdmin">{{ edit ? 'Stop it!' : `I'm God` }}</div>
    <div class="lBox">
        <div class="logo"></div>

		<h2 class="mt">Учебный центр "Цитадель"</h2>
		<div class="st">Центра информационных технологий и аналитики <br>"Дистанционная электронная лаборатория"</div>

        <!---h2 class="bt">&#8222;ЦИТАДЕЛЬ&#8221;</h2-->
    </div>
    <div class="rBox">
        <h2 class="contacts">
			<div class="phone">+7(985)522-32-42</div>
			<div class="email">admin@it-citadel.ru</div>
		</h2>
        <auth/>
    </div>
    <mainMenu/>
</header>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import auth from '@/components/auth.vue'
import mainMenu from '@/components/menu.vue'

export default {
    components: {
        auth,
        mainMenu
    },
	methods: {
		...mapActions([
			'toggleEdit'
		])
	},
	computed: {
		...mapGetters([
			'edit',
			'isAdmin'
		])
	}
}
</script>

<style lang="less">
header {
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.16);
    display: grid;
    align-items: center;
    justify-content: space-between;
    display: grid;
    grid-template: 	"em em"
					"l r"
					"m m";
    .menu {
        grid-area: m;
    }
	.editMode {
		grid-area: em;
		text-align: center;
		padding: 20px;
		background: #448aff;
		color: #fff;
		font-size: 20px;
		transition: all 0.5s ease-in-out;
		&:hover {
			background: red;
			cursor: pointer;
		}
	}
    .lBox {
        padding: 10px;
        display: grid;
        align-items: center;
        justify-items: center;
        //grid-template: "logo st st" "logo mt bt";
		grid-template: "logo mt" "logo st";
		grid-gap: 20px;
        .logo {
            grid-area: logo;
            width: 150px;
            height: 150px;
            background: url("../assets/images/logoCitadel.png") no-repeat;
            background-size: contain;
        }
        .st {
            grid-area: st;
            text-align: center;
			align-self: start;
        }
        .mt {
			align-self: end;
            grid-area: mt;
            text-align: center;
            font-size: 32px;
            line-height: 32px;
            margin: 0;
        }
        .bt {
            grid-area: bt;
            margin: 0;
            padding: 5px;
        }
    }
    .rBox {
        display: grid;
        justify-items: center;
        align-items: center;
        grid-auto-flow: column;
        .contacts {
            font-size: 26px;
            line-height: 46px;
            white-space: nowrap;
            .phone {
                background: url("../assets/images/ic_phone_black_24px.svg") no-repeat;
                background-size: auto 80%;
                background-position: 0 50%;
                padding-left: 60px;
            }
            .email {
                background: url("../assets/images/ic_email_black_24px.svg") no-repeat;
                background-size: auto 80%;
                background-position: 0 50%;
                padding-left: 60px;
            }
        }
    }
}
@media (max-width: 1050px) {
    header {
        grid-template: "em" "l" "r" "m";

        justify-content: stretch;
        align-items: center;
    }
}
@media (max-width: 700px) {
    header {
        overflow: hidden;
        .lBox {
            grid-template: "mt" "logo" "st" "bt";
        }
        .rBox {
            grid-auto-flow: row;
        }
    }
}
</style>
