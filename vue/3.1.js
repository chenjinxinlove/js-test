
function Observer(data, parentStr, originEvent) {
    this.event = originEvent ? originEvent :  new Event();
    this.data = data;
    for (var key in data) {
        var val = data[key];
        if (typeof data[key] === "object") {
            new Observer(val, parentStr ? parentStr + "," + key : key , this.event );
        }else {
            this.setGet(key, val, parentStr)
        }
    }

};

Observer.prototype.$watch = function(attr, callback) {
    //监听事件
    this.event.on(attr, callback)
};

Observer.prototype.setGet = function (key, value, parentStr) {
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
                    new Observer(newValue, parentStr ? parentStr + "." + key : key , _self.event);
                }
                // debugger;
                _self.event.emit(parentStr ? parentStr + "." + key : key ,key, newValue);
                _value = newValue;
            }
        })
    } catch (err) {
        console.error(err)
    }

};


(function(){
    let app1 = new Observer({
        name: {
            firstName: 'shaofeng',
            lastName: 'liang'
        },
        age: 25,
        city:{a:"beijing", b:"chengdu"}
    },"");
    // 方式一

    app1.$watch('name', function () {
        console.log('名字变了');
    })
    let app2 = new Observer({
        a:"a",
        b:"b",
        c:{
            d:"cd",
            a:"ca",
            e:{
                c:{a:"ceca"},
                a:"cea"
            }
        }
    });
    app1.$watch('c.e', function () {
        console.log('c.e');
    })


    app1.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
    app1.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
})();

