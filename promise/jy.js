
const statusProvider = (promise, status) => data => {
    if (promise.status !== 'pending') return false
	promise.status = status
	promise.result = data
	promise.listeners[status].forEach(fn => fn(data))
}

class BPromise {
    constructor(executor) {
        this.status = 'pending'
        this.listeners = {
            fulfilled: [],
            rejected: []
        }
        this.result = undefined
        executor(statusProvider(this, 'fulfilled'), statusProvider(this, 'rejected'))
    }
    // 传入两个参数，一个是成功的，一个是失败的
    then(...args) {
        const child = new this.constructor(() => {})
        const handler = fn => data => {
            if (typeof fn === 'function') {
                const result = fn(data)
                // 如果是promise
                if (result && result.then && typeof data.then === 'function') {
                    const successHandler = child.listeners.fulfilled[0]
                    const errorHandler = child.listeners.rejected[0]
                    result.then(successHandler, errorHandler)   
                } else {
                    statusProvider(child, 'fulfilled')(result)
                }
            } else if (!fn) {
                statusProvider(child, this.status)(data)
            }
		}
        switch (this.status) {
			case 'pending': {
				this.listeners['fulfilled'].push(handler(args[0]))
				this.listeners['rejected'].push(handler(args[1]))
				break
			}
			case 'fulfilled': {
				handler(args[0])(this.result)
				break
			}
			case 'rejected': {
				handler(args[1])(this.result)
				break
			}
		}
		return child
    }
    catch(args) {
        return this.then(undefined, args)
    }
}
BPromise.resolve = data => {
	return new APromise((resolve, reject) => resolve(data))
}

BPromise.reject = err => new APromise((resolve, reject) => reject(err))

BPromise.all = promises => {
	const length = promises.length
	const result = new BPromise(() => {})
	let count = 0
	const values = range(length)

	promises.forEach((p, i) => {
		p.then(data => {
			values[i] = data
			count++
			if (count === length) statusProvider(result, 'fulfilled')(values)
		}, statusProvider(result, 'rejected'))
	})
	return result
}

BPromise.race = promises => {
	const result = new BPromise(() => {})
	promises.forEach((p, i) => {
		p.then(statusProvider(result, 'fulfilled'), statusProvider(result, 'rejected'))
	})
    return result
}

function getNums () {
    return new BPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        })
    })
}

getNums()
    .then(res => {
        return res + 2
    })
    .then(r => {
        console.log(r)
    })
    .catch(err => {
        console.log(err)
    })