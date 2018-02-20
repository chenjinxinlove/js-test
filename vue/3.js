function Observer(data, parentStr, originEvent){
    this.data = data;
    this.eventCon = originEvent ? originEvent : new Event();   // 一个根Observer对象共享一个Event对象
    this.change(parentStr);
}
Observer.prototype.change =  function (parentStr){
    for(let prop in this.data){
        if(this.data.hasOwnProperty(prop)){
            value = this.data[prop];
            this.wrapper(prop, value, parentStr);
            if (typeof value === "object") {
                new Observer(value, parentStr?parentStr+"."+prop:prop, this.eventCon);
            }
        }
    }
};
Observer.prototype.wrapper = function(prop, value, parentStr){
    var observer = this;
    Object.defineProperty(this.data, prop, {   // 若this.data中已有prop属性，这个函数会将新定义的性质与其联系起来
        enumerable:true,
        configurable:true,
        set:function(newValue){
            console.log("你设置了 "+prop+", 新的值为 "+newValue);
            // 若绑定了event事件，则触发
            observer.eventCon.trigger(parentStr?parentStr+"."+prop:prop, value, newValue);
            if(typeof newValue === "object"){   // 若设置的新值是对象，也用observer包装
                new Observer(newValue, parentStr?parentStr+"."+prop:prop, observer.eventCon);
            }
            value = newValue;
        },
        get:function(){
            console.log("你访问了 "+ prop);
            return value; //利用局部变量的闭包性质
        }
    });

};
/**
 * 每个observer对象拥有一个Event对象，内部用一个events对象来保存该observer上注册的事件
 */

Observer.prototype.$watch = function(prop, callback){
    if(typeof callback !== "function"){
        console.log('callback is not function');
        return;
    }
    this.eventCon.on(prop,callback);
};

function Event(){
    this.events = {};
}
Event.prototype.trigger = function(type, ...args){
    while(type){
        if(this.events[type]){
            this.events[type].forEach(function(callback){
                callback(...args);
            });
        }
        let index = type.lastIndexOf(".");
        type = index>0 ? type.slice(0, index):"";
    }

    // 查其父属性
};
Event.prototype.on = function (type, callback) {
    if(this.events[type]){
        this.events[type].push(callback);
    } else {
        this.events[type] = [callback];
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