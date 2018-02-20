
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const idPromise = object => object && object.then && typeof object.then === 'function';
const noop = () => {};

const statusProvider = (promise, status) => data => {
    "use strict";
    if (promise.status !== PENDING) return false;
    promise.status = status;
    promise.result = data;
    switch (status) {
        case FULFILLED: return promise.successListener.forEach(fn => fn(data));
        case REJECTED: return promise.failureListener.forEach(fn => fn(data));
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.successListener = [];
        this.failureListener = [];
        this.result = undefined;
        executor(statusProvider(this, FULFILLED), statusProvider(this, REJECTED))
    }

    then(...args) {
        const child = new this.constructor(noop);

        const handler = fn => data => {
            if (typeof fn === 'function') {
                const result = fn(data);
                if (isPromise(result)) {
                    Object.assign(child, result);
                } else {
                    statusProvider(child, FULFILLED)(result);
                }
            } else if (!fn) {
                statusProvider(child, this.status)(data)
            }
        };
        switch (this.status) {
            case PENDING: {
                this.successListener.push(args[0]);
                this.failureListener.push(args[1]);
                break;
            }
            case FULFILLED: {
                args[0](this.status);
                break;
            }
            case REJECTED: {
                args[1](this.result);
            }
        }
        return child;
    }

    catch(arg) {
        return this.then(undefined, arg)
    }
}
