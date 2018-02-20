var timer = null;
window.onscroll = function () {
  clearTimeout(timer);
  timer = setTimeout(function () {

  }, 500)
}

var can = true;

window.onscroll = function () {
  if (!can) {
    return false;
  }
  can = false;
  setTimeout(function () {
    can = true;
  })

}

var add = (function () {
  var task = [];
  return function (...args) {
    if (args.length === 0) {
      return
    } else {

      task.push(args[1])
    }
  }
})();
