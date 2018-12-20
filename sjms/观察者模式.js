class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.updated()
    })
  }
  attach(observer) {
    this.observer.push(observer)
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log('dd')
  }
}

const EventEmitter = require('events').EventEmitter

const emitter1 = new EventEmitter()

emitter1.on('some', () => {
  console.log('some event is occured 1')
})

emitter1.on('some', () => {
  console.log('some evnet is occured 2')
})

emitter1.emit('some')


