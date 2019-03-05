
const statusProvider = (promise, status) => data => {
    if (promise.status !== 'pending') return false
    promise.status = status
    promise.result = data
    promise.listeners[status].forEach(fn => fn(data))
}

class BPromise {
    constructor(executor) {
        this.status = 'pending',
        this.result = undefined
        this.listeners = {
            fulfilled: [],
            rejected: []
        }
        executor(statusProvider(this, 'fulfilled'), statusProvider(this, 'rejected'))
    }
    then(...args) {
        const child = new this.constructor(() => {})
        const handler = fn => data => {
            if (typeof fn === 'function') {
                const result = fn(data)
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
                handler(args[0](this.result))
                break
            }
            case 'rejected': {
                handler(args[1])(this.result)
                break
            }
        }
        return child
    }
}