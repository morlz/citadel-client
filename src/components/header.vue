<template>
<header>
	<div class="editMode" @click="toggleEdit" v-if="isAdmin">{{ edit ? 'Stop it!' : `I'm God` }}</div>
    <div class="lBox">
        <div class="logo"></div>
        <div class="st">Центр информационных технологий и аналитики <br>"Дистанционная электронная лаборатория"</div>
        <h2 class="mt">Учебный<br>центр</h2>
        <h2 class="bt">&#8222;ЦИТАДЕЛЬ&#8221;</h2>
    </div>
    <div class="rBox">
        <h2 class="contacts">
				<div class="phone">+7 (985) 123-45-67</div>
				<div class="email">admen@site.site</div>
			</h2>
        <auth></auth>
    </div>
    <mainMenu></mainMenu>
</header>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import {
    default as auth
} from '@/components/auth.vue'

import {
    default as mainMenu
} from '@/components/menu.vue'

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
        grid-template: "logo st st" "logo mt bt";

        .logo {
            grid-area: logo;
            width: 150px;
            height: 150px;
            background: url("https://rlv.zcache.co.uk/your_logo_here_classic_round_sticker-r2acca0b24567489b9215e7360d9e9dc6_v9waf_8byvr_324.jpg") no-repeat;
            background-size: contain;
        }
        .st {
            padding: 5px;
            grid-area: st;
            text-align: center;
        }
        .mt {
            grid-area: mt;
            text-align: center;
            font-size: 32px;
            line-height: 32px;
            margin: 0;
            padding: 5px;
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
                background: url("./img/ic_phone_black_24px.svg") no-repeat;
                background-size: auto 80%;
                background-position: 0 50%;
                padding-left: 60px;
            }
            .email {
                background: url("./img/ic_email_black_24px.svg") no-repeat;
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
            grid-template: "st" "logo" "mt" "bt";
        }
        .rBox {
            grid-auto-flow: row;
        }
    }
}
</style>
