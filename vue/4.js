class Vue {
    constructor(obj) {
        this.el = obj.el;
        this.data = obj.data;
        this.init(this.el, this.data);
    }
    init (el, data) {
        let Enter = document.getElementById(el.slice(1));
        walk(Enter, data);

        function walk(entrance, obj, name) {
            if(entrance instanceof HTMLElement) {
                if(obj !== null && typeof obj === 'object') {
                    let reg;
                    for(let key in obj) {
                        if (typeof obj[key] !== 'object') {
                            reg = name ? new RegExp(`{{${name}.${key}}}`, 'g'): new RegExp(`{{${key}}}`, 'g');
                            translate(entrance, reg, obj[key]);
                        } else {
                            walk(entrance, obj[key], name ? `${name}.${key}`: key)
                        }
                    }
                } else {
                    console.log('入口无效!');
                }
            }
        }
        function translate(entrance, reg, value) {
            if (entrance instanceof HTMLElement) {
                let children = entrance.childNodes,
                    len = entrance.childNodes.length;
                for(let i = len - 1; i >= 0; i--) {
                    if(children[i].childNodes.length > 0) {
                        translate(children[i], reg, value);
                    } else {
                        children[i].textContent = children[i].textContent.replace(reg, value);
                    }
                }
            } else {
                console.log('入口无效！');
            }
        }
    }

}
let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: {
                firstName: '陈',
                lastName: '哈哈'
            },
            age: '999',
            sex: '男'
        }
    }
});