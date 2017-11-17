import fs from 'fs'

export default class {
	constructor(filename) {
		this.filename = filename
		this.cached = {}
	}

	get data () {
		return this.cached
	}

	set data (newCache) {
		this.cached = newCache
		this._write(newCache)
	}

	async init () {
		this.cached = await this._read()
	}

	_read () {
		return new Promise((resolve, reject) => {
			if (!fs.existsSync(this.filename)) {
				fs.writeFileSync(this.filename, "[]")
			}
			fs.readFile(this.filename, (err, data) => {
				if (err) {
					console.log(err)
					reject(err)
				}
				if (!err) {
					console.log(this.filename, "file readed")
					if (data.length) data = JSON.parse(data)
					resolve(data)
				}
			})
		})
	}

	async _write (newCache) {
		newCache = newCache || this.cached

		this.cached = newCache

		newCache = JSON.stringify( newCache )

		fs.writeFile(this.filename, newCache, err => {
			if (err) console.log(err)
			if (!err) console.log(this.filename, "file updated")
		})
	}
}
