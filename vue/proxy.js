class Vue {
    constructor(data) {
        this.data = data;
        this.initData();
    }
    initData(){
        this.proxy(this, `data`, 'a');
    }
    proxy(target, sourceKey, key){
        const sharedPropertyDefinition = {
            enumerable: true,
            configurable: true,
            get: ()=>{},
            set: ()=>{}
        }
        sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
        }
        sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }
}

const vue = new Vue({
    a: '1'
})

console.log(vue.data.a, vue.a)