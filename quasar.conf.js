// Configuration for your app

const path = require('path')

module.exports = function(ctx) {
	return {
		// app plugins (/src/plugins)
		plugins: [
			'i18n',
			'axios'
		],
		css: [
			'app.styl'
		],
		extras: [
			ctx.theme.mat ? 'roboto-font' : null,
			'material-icons',
			// 'ionicons',
			// 'mdi',
			'fontawesome'
		],
		supportIE: true,
		vendor: {
			add: [],
			remove: []
		},
		build: {
			scopeHoisting: true,
			vueRouterMode: 'hash',
			// gzip: true,
			// analyze: true,
			// extractCSS: false,
			// useNotifier: false,
			extendWebpack(cfg) {
				cfg.resolve.alias['@'] = path.resolve('src')
			}
		},
		devServer: {
			// https: true,
			// port: 8080,
			open: true, // opens browser window automatically
			proxy: {
				'/public': {
					target: 'http://edu.it-citadel.ru/',
					changeOrigin: true
				}
			}
		},
		// framework: 'all' --- includes everything; for dev only!
		framework: {
			components: [
				'QLayout',
				'QLayoutHeader',
				'QLayoutDrawer',
				'QPageContainer',
				'QPage',
				'QTooltip',
				'QToolbar',
				'QToolbarTitle',
				'QBtn',
				'QIcon',
				'QList',
				'QListHeader',
				'QItem',
				'QItemMain',
				'QItemSide',
				'QCard',
				'QCardMain',
				'QCardActions',
				'QCardMedia',
				'QCardTitle',
				'QTabs',
				'QTab',
				'QTabPane',
				'QCollapsible',
				'QInput',
				'QField',
				'QInnerLoading',
				'QSpinner',
				'QPageSticky',
				'QFab',
				'QFabAction'
			],
			directives: [
				'Ripple'
			],
			// Quasar plugins
			plugins: [
				'Notify'
			]
		},
		// animations: 'all' --- includes all animations
		animations: [
			'zoomInDown',
			'zoomOutDown'
		],
		pwa: {
			cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
			manifest: {
				// name: 'Quasar App',
				// short_name: 'Quasar-PWA',
				// description: 'Best PWA App in town!',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#027be3',
				icons: [{
						'src': 'statics/icons/icon-128x128.png',
						'sizes': '128x128',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-192x192.png',
						'sizes': '192x192',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-256x256.png',
						'sizes': '256x256',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-384x384.png',
						'sizes': '384x384',
						'type': 'image/png'
					},
					{
						'src': 'statics/icons/icon-512x512.png',
						'sizes': '512x512',
						'type': 'image/png'
					}
				]
			}
		},
		cordova: {
			// id: 'org.cordova.quasar.app'
		},
		electron: {
			extendWebpack(cfg) {
				// do something with cfg
			},
			packager: {
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',

				// Window only
				// win32metadata: { ... }
			}
		},

		// leave this here for Quasar CLI
		starterKit: '1.0.2'
	}
}
