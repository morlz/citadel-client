import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

export default {
	methods: {
		search_propHasValue (field, value) {
			if (field === null)
			 	return false

			if (typeof field === 'object') {
				let tmp = ( Array.isArray(field) ? field : Object.values(field) )
				return tmp.map(
					el => this.search_propHasValue(el, value)
				).includes(true)
			}


			if (typeof field === 'number')
				field = field.toString()

			if (typeof field === 'string')
				return !!(field.toLowerCase().indexOf(value.toLowerCase()) + 1)

			return field === value
		},
		basicSearch (arr, search) {
			if (!search || typeof search !== 'string')
				return arr

			let splitedSearch = search.split(' ')
			return arr.filter(el => splitedSearch.map(word => this.search_propHasValue(el, word)).includes(true))
		}
	}
}
