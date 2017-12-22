class PubSub {
    constructor() {
        this.handlers = {};
    }
    on(eventType, handler) {
        //订阅
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }
    emit(eventType, ...args) {
        //发布
        for (let i = 0; i < this.handlers[eventType].length; i++) {
            this.handlers[eventType][i].apply(this, args);
        }
        return this;
    }
}

var pubsub = new PubSub();

pubsub.on('A',function(data){

    console.log(1 + data);  // 执行第一个回调业务函数

});

pubsub.on('A',function(data){

    console.log(2 + data); // 执行第二个业务回调函数

});

// 触发事件A

pubsub.emit('A',"我是参数");