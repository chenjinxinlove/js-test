let Vue = function (obj) {
    this.entry = document.querySelector(obj.el);
    this.data = {};
    this.init(obj);
};
Vue.prototype.walk = function (output, input) {
    for (let key in input) {
        if (input.hasOwnProperty(key)) {
            if (typeof input[key] !== 'object' || input[key] === null) {
                this.convert(output, key, input[key]);
            } else {
                this.walk(output[key] = {}, input[key]);
            }
        }
    }
};
Vue.prototype.convert = function (ins, key, value) {
    let __value = value;
    let that = this;
    Object.defineProperty(ins, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            return __value;
        },
        set: function (newVal) {
            if (newVal === null || typeof newVal !== 'object') {
                __value = newVal;
                that.render(that.daa, that.entry);
            } else {
                delete ins[key];
                that.walk(ins[key], newVal);
                that.render(that.data, that.entry);
            }
        }
    })
};
Vue.prototype.find = function (key, data) {
    for(let i = 0, len = key.length; i < len; i++) {
        if (data.hasOwnProperty(key[i])) {
            data = data[key[i]];
        } else {
            return undefined;
        }
    }
    return data;
};
Vue.prototype.render = (function () {
    let domCache;
    return function (data, entry) {
        domCache = domCache || entry.innerHTML;
        let domInnerHtml = domCache;
        let reg = /{{.*}}/g;
        let templateArr = [];
        let matchCache;
        let keyCache;
        let value;
        while (matchCache = reg.exec(domCache)) {
            templateArr.push(matchCache[0]);
        }
        templateArr.forEach(item => {
            keyCache = item.slice(2, -2).split('.');
            value = this.find(keyCache, data);
            if (value !== undefined && (typeof value !== 'object' || value === null)) {
                reg = new RegExp('{{' + keyCache.join('.') + '}}', 'g');
                domInnerHtml = domInnerHtml.replace(reg, value);
            }
        });
        entry.innerHTML = domInnerHtml;
    }
}());
Vue.prototype.init = function (obj) {
    this.walk(this.data, obj.data);
    this.render(this.data, this.entry);
};

let app = new Vue({
    el: '#app',
    data: {
        user: {
            name:  '陈',
            age: '999',
            sex: '男'
        }
    }
});