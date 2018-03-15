Function.prototype.apply = Function.prototype.apply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result, args = [];
    if(!arr) {
        result = context.fn();
    } else {
        for(var i = 0; i <arr.length; i++) {
            args.push('arr['+ i +']')
        }
        result = eval('context.fn('+ args +')')
    }
    delete context.fn;
    return result
}

Function.prototype.apply = Function.prototype.apply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result, args = [];
    if (!arr) {
        result = context.fn();
    } else {
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i +']')
        }
        result = eval('context.fn('+ args +')')
    }
    delete context.fn;
    return result;
}