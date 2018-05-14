function defineReactive (obj, key, val) {
    var dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
    			dep.addSub(Dep.target);
    		};
            return val
        },
        set: function (newVal) {
            val = newVal
            console.log(newVal)
            dep.notify();
        }
    })
}

function Observer (obj, key, value) {
    // 递归obj
    if ({}.toString.call(value) == '[object Object]') {
		Object.keys(value).forEach(function(key){
			new Observer(value,key,value[key])
		})
	};
    defineReactive(obj, key, value)
}

function observer (obj) {
    Object.keys(obj).forEach((key) => new Observer(obj, key, obj[key]))
}

function Dep(){
	this.subs = [];

	this.addSub = function (watcher) {
		this.subs.push(watcher);
		console.log(this.subs.length);
	}

	this.removeSub = function (watcher) {
		var index = this.subs.indexOf(watcher);
		if (index > -1) {
			this.subs.splice(index, 1);
		};
	}

	this.notify = function(){
		this.subs.forEach(function(watcher){
			watcher.update();
		});
	}
}

function Watcher(fn){
	this.update = function(){
		Dep.target = this;
		fn();
		Dep.target = null;
	}
	this.update();
}

class Vue {
    constructor(options) {
        this.$data = options.data;
        observer(this.$data)
    }
}

let app = new Vue({
    data: {
        text: {
            'a': '1'
        },
        text2: 'text2'
    }
})