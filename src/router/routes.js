export default [
	{
		path: '/', component: () => import ('layouts/default'),
		children: [
			{ path: '', component: () => import ('layouts/index'), props: { id: 2 }, children: [
				{ path: '', component: () => import('pages/Static')  },
				{ path: 'edit', component: () => import('pages/StaticEdit')  },
			] },
			{ path: 'work', component: () => import ('layouts/index'), props: { id: 1 }, children: [
				{ path: '', component: () => import('pages/Static')  },
				{ path: 'edit', component: () => import('pages/StaticEdit')  },
			] },
			{ path: 'payment', component: () => import ('layouts/index'), props: { id: 3 }, children: [
				{ path: '', component: () => import('pages/Static')  },
				{ path: 'edit', component: () => import('pages/StaticEdit')  },
			] },
			{ path: 'cource/:id/:lesson?', component: () => import ('layouts/Cource'), children: [
				{ path: '', component: () => import('pages/Cource')  },
				{ path: 'edit', component: () => import('pages/CourceEdit')  },
			] },
			{ path: 'category/:id', component: () => import ('layouts/Category'), children: [
				{ path: '', component: () => import('pages/Category')  },
				{ path: 'edit', component: () => import('pages/CategoryEdit')  },
			] },
			{ path: 'center/:id', component: () => import ('layouts/Center'), children: [
				{ path: '', component: () => import('pages/Center')  },
				{ path: 'edit', component: () => import('pages/CenterEdit')  },
			] },
			{ path: 'new/:id', component: () => import ('layouts/New'), children: [
				{ path: '', component: () => import('pages/New')  },
				{ path: 'edit', component: () => import('pages/NewEdit')  },
			] },
			{ path: 'user/:id', component: () => import ('layouts/Profile'), children: [
				{ path: '', component: () => import('pages/Profile')  },
				{ path: 'edit', component: () => import('pages/Profile')  },
			] }
		]
	},
	// Always leave this as last one
	{ path: '*', component: () => import ('pages/404') }
]
