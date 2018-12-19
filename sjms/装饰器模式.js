class Circle {
  draw() {
    console.log('画一个圆')
  }
}

class Decorator {
	constructor(circle) {
		this.circle = circle
	}
	draw() {
		this.circle.draw()
		this.setRedBorder(circle)
	}
	setRedBorder(circle) {
    console.log('红色')
  }
}

let circle = new Circle()

circle.draw()

let dec = new Decorator(circle)
dec.draw()

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    return oldValue.apply(this, arguments);
  }
  return descriptor;
}

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();
const result = math.add(2, 4);