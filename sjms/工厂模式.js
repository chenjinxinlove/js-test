class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('init')
  }
  fun1() {
    console.log('func1')
  }
  func2() {
    console.log('func2')
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

let creator = new Creator()
let p = creator.create('chen')
p.init()
p.fun1() 


class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice
    let dom = slice.call(document.querySelector(selector))
    let len = dom ? dom.length: 0
    for(let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {

  }
  addClass(name) {

  }
}
window.$ = function(selector) {
  return new jQuery(selector)
}