var debounce = function (adle, active) {
    var last = true;
    return function () {
        var slef = this, args = arguments;
        last = setTimeout(function () {
            active.apply(slef, args)
        }, adle)
    }
}