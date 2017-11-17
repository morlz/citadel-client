<script>
export default {
	computed: {
		roleNames(){
			return [
				'Незарегистрирован',
				'Администратор',
				'Преподаватель',
				'Пользователь',
				'Подтверждение почты'
			]
		}
	},
    methods: {
		roleName(id){
			let roles = [
				'Незарегистрирован',
				'Администратор',
				'Преподаватель',
				'Пользователь',
				'Подтверждение почты'
			]
			return roles[id]
		},
		roleIconClass(id){
			let classes = [
	   			'unregisteredIcon',
	   			'adminIcon',
	   			'prepodIcon',
	   			'userIcon',
	   			'emailConfirmIcon'
			]
			return classes[id]
		},
		searchFn(el, search) {
			let searchOne = (el, search) => {
				let finded = false
				for (var prop in el) {
					if (el.hasOwnProperty(prop)) {
						if (typeof el[prop] == 'object') {
							for (var prop2 in el[prop]) {
								if (el[prop][prop2] && el[prop].hasOwnProperty(prop2)) {
									 if (
										 typeof el[prop][prop2].indexOf == 'function' &&
										 el[prop][prop2].indexOf(search) + 1
									 ) finded = true
								}
							}
						} else if (
							typeof el[prop].indexOf == 'function' &&
							el[prop].indexOf(search) + 1
						) finded = true
					}
				}
				return finded
			}
			let splited = search.split(" ")

			if (!el) return

			let allFinded = true
			splited.map(search => {
				if(!searchOne(el, search)) allFinded = false
			})

			return allFinded
		},

        EasingFunctions: {
            // no easing, no acceleration
            linear: function(t) {
                return t
            },
            // accelerating from zero velocity
            easeInQuad: function(t) {
                return t * t
            },
            // decelerating to zero velocity
            easeOutQuad: function(t) {
                return t * (2 - t)
            },
            // acceleration until halfway, then deceleration
            easeInOutQuad: function(t) {
                return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            },
            // accelerating from zero velocity
            easeInCubic: function(t) {
                return t * t * t
            },
            // decelerating to zero velocity
            easeOutCubic: function(t) {
                return (--t) * t * t + 1
            },
            // acceleration until halfway, then deceleration
            easeInOutCubic: function(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            },
            // accelerating from zero velocity
            easeInQuart: function(t) {
                return t * t * t * t
            },
            // decelerating to zero velocity
            easeOutQuart: function(t) {
                return 1 - (--t) * t * t * t
            },
            // acceleration until halfway, then deceleration
            easeInOutQuart: function(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
            },
            // accelerating from zero velocity
            easeInQuint: function(t) {
                return t * t * t * t * t
            },
            // decelerating to zero velocity
            easeOutQuint: function(t) {
                return 1 + (--t) * t * t * t * t
            },
            // acceleration until halfway, then deceleration
            easeInOutQuint: function(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
            }
        }
    }
}
</script>
