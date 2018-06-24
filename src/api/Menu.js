const menu = [
	{
		name: "О Центре",
		path: "/",
		icon: 'home'
	},
	{
		name: "Учебные площадки",
		icon: 'domain'
	},
	{
		name: "Направления",
		icon: 'assignment'
	},
	{
		name: "Документы и реквизиты",
		path: "/work",
		icon: 'fa-file'
	},
	{
		name: "Оплата",
		path: "/payment",
		icon: 'credit_card'
	},
	{
		name: "Режим бога",
		hide: !this.isAdmin,
		icon: 'grade',
		role: 1,
		childs: [
			{
				name: "Пользователи",
				path: "/users/",
				icon: 'accessible'
			},
			{
				name: "Занятия",
				path: "/lessons/",
				icon: 'fa-list-ul'
			}
		]
	}
]

class MenuItem {
	constructor (options = {}) {
		this.name = options.name || ''
		this.path = options.path || ''
		this.icon = options.icon || ''
		this.description = options.description || ''
		this.avatar = options.avatar || ''
		this.childs = Array.isArray(options.childs) ?
			options.childs.map(el => new MenuItem(el))
		:	[]
	}

	get hasChilds () {
		return !!this.childs.length
	}

	setChilds (value) {
		if (!Array.isArray(value))
			return console.warn('[MenuItem] [setChilds] argument is not an array')

		this.childs = value.map(el => new MenuItem(el))
		return this
	}
}


class Menu extends MenuItem {
	constructor (role) {
		super({
			name: 'Меню'
		})

		this.childs = menu.map(el => el.role === undefined || el.role >= role ? new MenuItem(el) : null).filter(el => el)
	}
}

export default Menu

export {
	Menu,
	MenuItem
}
