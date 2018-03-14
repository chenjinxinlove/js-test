Function.prototype.bind = Function.prototype.bind = function (context) {
    var self = this;
    return function () {
        self.apply(context, [].slice.call(arguments))
    }
}
Function.prototype.bind = Function.prototype.bind = function (context) {
    var self = this;
    var args = [].slice.call(arguments,1);
    var F = function () {}
    function bound() {
        self.apply( F instanceof this ? this : context ,args.concat([].slice.call(arguments)))
    }
    F.prototype = this.prototype;
    bound.prototype = new F();
    return bound
}

