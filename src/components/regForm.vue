<template>
<div class="regFormWrapper" :class="{regFormWrapperActive: regFormShow}">
    <div class="regForm mather">
        <div class="content">
            <h2>Запись</h2>
            <h4>Занятие</h4>
            <input type="text" :value="data.title" disabled>
            <h4>Имя</h4>
            <input type="text" v-model="editFields.name" placeholder="Иванов Иван" disabled>
            <h4>Email</h4>
            <input type="text" v-model="editFields.email" placeholder="some@mail.com" disabled>
            <h4>Телефон</h4>
            <input type="text" v-model="editFields.phone" placeholder="9 (876) 543 21 21">
			<div class="bottomBar">
				<vue-recaptcha :sitekey="reCaptchaKey" @verify="reOnVerify" @expired="reOnExpired" ref="recaptcha" />
			</div>
        </div>
        <div class="buttons">
            <div class="buttonTR" @click="close">Отмена</div>
            <div class="buttonTRb" @click="regHadnler">Записаться</div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import VueRecaptcha from 'vue-recaptcha'

export default {
    data() {
        return {
            editFields: {
                name: "",
                email: "",
                phone: ""
            }
        }
    },
    components: {
        VueRecaptcha
    },
    methods: {
        ...mapActions([
            'regFormHide',
            'lectionReg',
            'reOnVerify',
            'reOnExpired'
        ]),
        close() {
            this.regFormHide()
			this.$refs.recaptcha.reset()
        },
        regHadnler() {
            let data = Object.assign({
                lesson: this.data,
                'g-recaptcha-response': this.reToken
            }, this.editFields)
            this.lectionReg(data)
			this.regFormHide()
			this.$refs.recaptcha.reset()
        }
    },
    computed: {
        ...mapGetters([
            'regFormShow',
            'regFormContent',
            'reCaptchaKey',
            'reToken',
			'user'
        ]),
        data() {
            return this.regFormContent || {}
        },
        buttons() {
            return this.regFormContent.buttons ? this.regFormContent.buttons : [{
                name: 'ok'
            }]
        }
    },
	watch: {
		regFormShow (n) {
			if (!n) return
			for (var prop in this.editFields) {
				if (this.editFields.hasOwnProperty(prop)) {
					this.editFields[prop] = this.user[prop]
				}
			}
		}
	}
}
</script>

<style lang="less">
.regFormWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 30;
    pointer-events: none;
    background: transparent;
    transition: all 0.3s ease-in-out;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    justify-items: center;
    align-items: center;
    opacity: 0;
    .regForm {
        min-width: 500px;
        padding: 30px;
        background: #fff;
        h2 {
            margin: 0;
        }
        .content {
            padding: 10px;
            display: grid;
            grid-auto-flow: row;
            justify-items: stretch;
            margin: 10px;
        }
        .buttons {
            display: flex;
            justify-content: flex-end;
        }
		.bottomBar {
			padding: 20px;
			.tooltip {
				margin-bottom: 10px;
			}
		}
    }
}
.regFormWrapperActive {
    pointer-events: all;
    opacity: 1;
}
</style>
