function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
  var hw = helloWorldGenerator();
  function* f() {
    console.log('执行了！')
  }
  
  var generator = f();
  
  setTimeout(function () {
    generator.next()
  }, 2000);


  function* f() {
    for(var i = 0; true; i++) {
      var reset = yield i;
      console.log(reset, 'reset')
      if(reset) { i = -1; }
    }
  }
  
  var g = f();
  
  g.next() // { value: 0, done: false }
  g.next() // { value: 1, done: false }
  g.next()
  g.next()
  g.next()
  g.next()
  g.next(true) // { value: 0, done: false }


  function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

console.log(g.next())        // { value: 1, done: false }
console.log(g.return('foo')) // { value: "foo", done: true }
console.log(g.next())       // { value: undefined, done: true }