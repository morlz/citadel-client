<template>
<footer>
    <div class="footerMenu">
        <div class="footerMenuColumn" v-for="item in menu">
            <div class="columnName">{{item.name}}</div>
            <router-link :to="{ path: childItem.path }" class="childItem" v-for="(childItem, index) in item.childs" v-if="childItem.path" :key="index" :class="childItem.class">{{childItem.name}}</router-link>
            <div v-for="(childItem, index) in item.childs" class="childItem" v-if="!childItem.path && !childItem.url" :class="childItem.class" v-html="childItem.name"></div>
            <a v-for="(childItem, index) in item.childs" class="childItem" v-if="childItem.url" :class="childItem.class" :href="childItem.url">{{childItem.name}}</a>
        </div>
    </div>
    <div class="copyright">Copyright © 2017 ООО "ЦИТАДЕЛЬ"</div>
</footer>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'centers',
            'categories'
        ])
    },
    watch: {
        centers(newVal) {
            this.menu.find(el => el.name == "Площадки").childs = this.format("centers", newVal)
        },
        categories(newVal) {
            this.menu.find(el => el.name == "Курсы").childs = this.format("cat", newVal)
        }
    },
    methods: {
        format(type, items) {
            return items.map(item => {
                return {
                    name: item.title,
                    path: `/${type}/${item.id}`
                }
            })
        }
    },
    data() {
        return {
            menu: [
                /*{
                                    name: "Share",
                                    childs: [{
                                            name: "VK",
                                            url: "http://vk.com/"
                                        },
                                        {
                                            name: "twitter",
                                            url: "http://twitter.com/"
                                        }
                                    ]
                                },*/
                {
                    name: "О нас",
                    childs: [{
                            name: "Учебный центр",
                            path: "/"
                        },
						{
							name: "Учредитель",
							url: "http://it-citadel.ru/"
						},
                        {
                            name: "Документы",
                            path: "/work"
                        },
                        {
                            name: "Реквизиты",
                            path: "/recs"
                        }
                    ]
                },
                {
                    name: "Площадки",
                    childs: []
                },
                {
                    name: "Курсы",
                    childs: []
                },
                {
                    name: "Контакты",
                    childs: [{
                            name: "+7(985)522-32-42",
                        },
                        {
                            name: "admin@it-citadel.ru",
                        },
                        {
                            name: "141840, МО, г.Яхрома, <br>ул.Заречная, д.2",
                        }
                    ]
                },
            ]
        }
    }
}
</script>

<style lang="less">
footer {
    box-sizing: border-box;
    margin-top: 100px;
    width: 100%;
    text-align: left;
    background: #444;
    font-size: 14px;
    color: #E1E1E1;
    padding: 100px 10%;
    a {
        text-decoration: none;
        color: #E1E1E1;
    }
    .footerMenu {
        .footerMenuColumn {
            .columnName {
                text-transform: uppercase;
                margin-bottom: 20px;
                opacity: 0.5;
                padding: 5px 10px;
            }
            display: grid;
            grid-auto-flow: row;
            justify-items: start;
            grid-gap: 4px;
            .childItem {
                transition: all 0.2s ease-in-out;
                &:hover {
                    background-color: rgba(255,255,255,0.1);
                }
                border-radius: 60px;
                padding: 5px 10px;
            }
        }
        display: grid;
        align-items: start;
        justify-items: stretch;
        grid-auto-flow: column;
    }
    .copyright {
        margin: 120px auto 0;
        font-size: 12px;
        text-align: center;
    }
}

@media (max-width: 800px) {
    footer {
        padding: 20px;
        .footerMenu {
            grid-auto-flow: row;
            .footerMenuColumn {
                justify-items: center;
                .columnName {
                    margin: 40px 0 0;
                }
            }
        }
    }
}
</style>
