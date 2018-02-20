/**
 * Created by chenjinxin on 2018/2/18.
 */

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

function run(gen) {
  var g = gen();
  function next(data) {
    var result = g.next(data);
    if (result.done) {
      return result.value;
    }
    // result.value.then(function (data) {
      next(result.value);
    // })
  }
  next(5);
}

console.log(run(foo));


function foo(url) {
  var state;//管理状态
  var val;//生成器变量范围声明

  function process(v) {
    switch (state) {
      case 1:
        return request(url);
      case 2:
        val = v;
        return
      case 3:
        var err = v;
        return false;
    }
  }
  //构造并返回一个生成器
  return {
    next: function (v) {
      if(!state) {
        state = 1;
        return {
          done: false,
          value: process()
        }
      }
      else if (state == 1) {
        state = 2;
        return {
          done: true,
          value: process(v);
        }
      }
      else {
        return {
          done:  true,
          value: undefined
        }
      }
    },
    "throw": function (e) {
      //唯一的显式错误处理在状态1
      if(state == 1) {
        state = 3;
        return {
          done: true,
          value: process(e)
        };
        //否则错误就不会处理，所以只把它抛出
      } else {
        throw e;
      }
    }
  }

}
