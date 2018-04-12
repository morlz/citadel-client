export default [
	{
		path: '/', component: () => import ('layouts/default'),
		children: [
			{ path: '', component: () => import ('pages/index'), props: { id: 1 } },
			{ path: 'work', component: () => import ('pages/index'), props: { id: 2 } },
			{ path: 'payment', component: () => import ('pages/index'), props: { id: 3 } },
			{ path: 'cource/:id/:lesson?', component: () => import ('pages/Cource') },
			{ path: 'category/:id', component: () => import ('pages/Category') },
			{ path: 'center/:id/:new?', component: () => import ('pages/Center') },
			{ path: 'user/:id', component: () => import ('pages/Profile') }
		]
	},
	// Always leave this as last one
	{ path: '*', component: () => import ('pages/404') }
]
