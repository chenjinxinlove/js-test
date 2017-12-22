class Event {
    constructor() {
        this.handler = {};
    }

    on(eventType, handler) {
        if(!(eventType in this.handler)) {
            this.handler[eventType] = []
        }
        this.handler[eventType].push(handler);
    }

    emit(eventType, ...args) {
        for (let i = 0; i < this.handler[eventType].length; i++) {
            this.handler[eventType][i].apply(this, args);
        }
        return this;
    }
}


function Observer(data) {
    this.event = new Event();
    this.data = data;
    for (var key in data) {
        var val = data[key];
        if (typeof data[key] === "object") {
            new Observer(val);
        }else {
            this.setGet(key)
        }
    }

};

Observer.prototype.$watch = function(attr, callback) {
    //监听事件
    this.event.on(attr, callback)
};

Observer.prototype.setGet = function (key, value) {
    var _value = value;
    var _self = this;
    try{
        Object.defineProperty(this.data, key, {
            configurable: true,
            enumerable: true,
            get :function () {
                console.log('你访问了' + key);
                return _value;
            },
            set: function (newValue) {
                if (_value === newValue) {
                    return;
                }
                console.log('你设置了' + key, '新的值为' + newValue);

                if (typeof newValue === 'object') {
                    new Observer(newValue);
                }
                // debugger;
                _self.event.emit(key, newValue);
                _value = newValue;
            }
        })
    } catch (err) {
        console.error(err)
    }

};

// let obj = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: 4
//     }
// }
//
// let app1 = new Observer(obj);
//
//
// // 要实现的结果如下：
// app1.data.c.d // 你访问了 name

// let app1 = new Observer({
//     name: 'youngwind',
//     age: 25
// });
//
// app1.data.name = {
//     lastName: 'liang',
//     firstName: 'shaofeng'
// };
//
// app1.data.name.lastName;
// // 这里还需要输出 '你访问了 lastName '
// app1.data.name.firstName = 'lalala';
// // 这里还需要输出 '你设置了firstName, 新的值为 lalala'

//任务三：传递回调函数

 let app3 = new Observer({
            name: 'youngwind',
            age: 25
        });
 // 你需要实现 $watch 这个 API
 app3.$watch('age', function(age) {
            console.log(`我的年纪变了，现在已经是：${age}岁了`)
        });
