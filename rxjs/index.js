var subscriber = function(observer) {
    observer.next('1');
    observer.next('2');
    observer.complete();
}

var observer1 = {
    next: function(value) {
        console.log(value);
    },
    error: function(error) {
        console.log(error);
    },
    complete: function() {
        console.log('complete');
    }
}

var source$ = Rx.Observable.create(subscriber);
subscription = source$.map(x => x * x).subscribe(observer1);
setTimeout(()=> {
    subscription.unsubscribe();
}, 3000);
