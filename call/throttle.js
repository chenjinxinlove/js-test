/**
 * Created by chenjinxin on 2018/3/14.
 */
var throttle = function (fn, interval) {
  var self = fn,
    timer,
    firstTime = true;
  return function () {
    var args = arguments;
    var me = this;
    if (firstTime) {
      self.apply(me, args)
      return firstTime = false
    }
    if(timer) {
      return false
    }
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      self.apply(me, args)
    }, interval || 500)

  }
}