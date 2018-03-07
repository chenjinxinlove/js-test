Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for (var i = 1, len = arguments.length; i< len; i++) {
        args.push('arguments['+i+']');
    }

    var result = eval('context.fn' + args + ')');

    delete context.fn;
    return result;
};

Function.prototype.apply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result;

    if (!arr) {
        result = context.fn();
    } else {
      var args = [];
      for(var i = 0, len = arr.length; i< len; i++) {
          args.push('arr['+i+']');
      }
      result = eval('context.fn(' + args + ')')
    }
    return result;
}


Function.prototype.bind = Function.prototype.bind || function (context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    var F = function () {

    };
    var Bound = function () {
        var bindArgs = [].slice.call(arguments);
        return self.apply(this instanceof F ? this : context, args.concat(bindArgs))
    }
    F.prototype = this.prototype;
    Bound.prototype = new F();
    return Bound;
}

var curring = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }


}
