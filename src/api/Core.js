import axios from 'axios'
import EventEmitter from 'events'
import path from 'path'

const domain = '/public'

class ApiCore extends EventEmitter {
	async invoke (url, options = {}, method = 'get') {
		const req = { [method === 'get' ? 'params' : 'data']: options }

		if (options.id !== undefined) {
			console.log(domain, url, '/' + options.id);
			url = path.join(domain, url, '/' + options.id)
			delete options.id
		}

		let res = await axios({ ...req, method, url })

		if ((!res.data && res.status != 200) || res.data.error)
			return this.handleError(res)

		return res.data
	}

	async get (...args) {
		return await this.invoke(...args)
	}

	async post (...args) {
		return await this.invoke(...args, 'post')
	}

	async delete (...args) {
		return await this.invoke(...args, 'delete')
	}

	async put (...args) {
		return await this.invoke(...args, 'put')
	}

	handleError ({ data, status }) {
		this.emit('error', data.error || data)

		if (data.error)
			return this.emit('handledError', data.error)

		return this.emit('unhadledError', data)
	}
}

export default new ApiCore()
