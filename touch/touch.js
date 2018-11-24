window.onload = function() {
    var el = this.document.getElementById('touch');
    el.addEventListener('touchstart', function(e) {
        console.log(e.touches);
        console.log(e.targetTouches);
        console.log(e.changedTouches);
    }, false)
}