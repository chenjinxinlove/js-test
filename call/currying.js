var currying  = function (fn) {
    var arr = [];
    return function () {
        if(arguments.length !== 0) {
            [].apply(arr, arguments);
            return arguments.callee;
        } else {
            return fn.apply(this, arr)
        }
    }
}