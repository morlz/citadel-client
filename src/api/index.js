import cookie from './cookie'
import axios from 'axios'

const sortFnFactory = (field, revert = false) => {
	return (a, b) => {
		if (typeof field == 'function') {
			if (field(a) > field(b)) return revert ? 1 : -1
			if (field(a) < field(b)) return revert ? -1 : 1
		}
		if (a[field] > b[field]) return revert ? 1 : -1
		if (a[field] < b[field]) return revert ? -1 : 1
		return 0
	}
}


const serverAddr = 'public'

export default {
    async invoke(data) {
		let auth = cookie.getAuth()
		if (auth && auth.uid && auth.api_token) data.data = Object.assign(cookie.getAuth(), data.data)

		if (process.env.NODE_ENV == 'dev') console.log(`invoke api (${data.method}):`, data.data)
        //let apiResponce = await _emitApiFunction(data)

		let url = `${serverAddr}/${data.data.type}${data.data.id ? '/' + data.data.id : ''}`

		delete(data.data.id)
		delete(data.data.type)

		let apiResponce = await axios[data.method](url, {
			params: data.data
		})

        if (process.env.NODE_ENV == 'dev') console.log("req:", data.data, "api responce:", apiResponce)
        return apiResponce
    },
	cookie,
	sortFnFactory
}
