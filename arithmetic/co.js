async (function* () {
    try {
        const ninjas = yield getJSON("data/ninjas.json");
        const missions = yield getJSON(ninjas[0].missionsUrl);
        const missionDescription = yield getJSON(missions[0].detailsUrl);
        //Study the mission details
    } catch (e) {
        //Oh no, we weren't able to get the mission details
    }
});

function async (generator) { // ⇽---　定义一个辅助函数，用于对我们定义的生成器执行操作
    var iterator = generator(); // 　⇽---　创建一个迭代器，进而我们可以控制生成器

    function handle(iteratorResult) { // ⇽---　定义函数handle，用于对生成器产生的每个值进行处理
        if (iteratorResult.done) {
            return;
        } // ⇽---　当生成器没有更多结果返回时停止执行

        const iteratorValue = iteratorResult.value;

        if (iteratorValue instanceof Promise) {
            iteratorValue.then(res => handle(iterator.next(res)))
                .catch(err => iterator.throw(err)); 
            // ⇽---　如果生成的值是一个promise，则对其注册成功和失败回调。这是异步处理的部分。如果promise成功返回，则恢复生成器的
            // 执行并传入promise的返回结果。如果遇到错误，则向生成器抛出异常
        }
    }

    try {
        handle(iterator.next());
    } catch (e) {
        iterator.throw(e);
    } // ⇽---　重启生成器的执行
}