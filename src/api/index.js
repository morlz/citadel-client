import cookie from './cookie'
import axios from 'axios'

//const serverAddr = `http://localhost/www15/blog/public`
//const serverAddr = `cit2/public`

//const serverAddr = process.env.NODE_ENV == 'development' ? '/www15/blog/public' : 'public'
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
	cookie
}
