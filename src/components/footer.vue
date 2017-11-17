<template>
<footer>
    <div class="footerMenu">
        <div class="footerMenuColumn" v-for="item in menu">
            <div class="columnName">{{item.name}}</div>
            <router-link :to="{ path: childItem.path }" class="childItem" v-for="(childItem, index) in item.childs" v-if="childItem.path" :key="index" :class="childItem.class">{{childItem.name}}</router-link>
			<div v-for="(childItem, index) in item.childs" class="childItem" v-if="!childItem.path && !childItem.url" :class="childItem.class" >{{childItem.name}}</div>
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
            'centers'
        ])
    },
    watch: {
        centers(newVal) {
            this.menu.find(el => el.name == "Centers").childs = this.format("centers", newVal)
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
            menu: [{
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
                },
                {
                    name: "Contacts",
                    childs: [{
                            name: "9 892 098765",
                        },
                        {
                            name: "mail@ilam.py",
                        }
                    ]
                },
                {
                    name: "Centers",
                    childs: []
                },
                {
                    name: "Any more cat",
                    childs: [{
                            name: "Some child 1"
                        },
                        {
                            name: "Some child 2"
                        },
                        {
                            name: "Some child link 404",
                            path: "/404"
                        },
                        {
                            name: "Some child external link",
                            url: "http://google.com/"
                        }
                    ]
                }
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
		margin: 120px auto 0 auto;
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
					margin: 40px 0 0 0;
				}
			}
		}
	}
}
</style>
