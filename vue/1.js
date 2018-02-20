function Observer(obj) {
    if (!obj) {
        console.log('not null');
    }
    if (Object.prototype.toString.apply(obj) !== '[object Object]') {
        console.log('not object');
    }
    this.data = obj;
    this.handle();
};

Observer.prototype.handle = function () {
    // debugger;
   for (var key in this.data) {
       if (!this.data.hasOwnProperty(key)) {
           return;
       }
       this.setGet(key);
   }
};

Observer.prototype.setGet = function (key, value) {
    var _value = value;
    try{
        Object.defineProperty(this.data, key, {
            configurable: true,
            enumerable: true,
            get :function () {
                console.log('你访问了' + key);
                return _value;
            },
            set: function (newValue) {
                if (_value !== newValue) {
                    console.log('你设置了' + key, '新的值为' + newValue);
                }
                _value = newValue;

            }
        })
    } catch (err) {
        console.error(err)
    }

};

let app1 = new Observer({
    name: 'youngwind',
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app2.data.major = 'science'  // 你设置了 major，新的值为 science