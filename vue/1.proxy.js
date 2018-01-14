function Observer(obj) {
    let o = new Proxy(obj, {
        get: function (target, key, receiver) {
            console.log(`getting:`);
            console.log(key);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            if (value === target[key]) {
                return;
            }
            console.log(`setting : `);
            console.log(key);
            return Reflect.set(target, key, observer(value), receiver);
        }
    })
    return o;
};


let app1 = new Observer({
    name: 'youngwind',
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});

// 要实现的结果如下：
app1.name // 你访问了 name