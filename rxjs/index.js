// var subscriber = function(observer) {
//     observer.next('1');
//     observer.next('2');
//     observer.complete();
// }

// var observer1 = {
//     next: function(value) {
//         console.log(value);
//     },
//     error: function(error) {
//         console.log(error);
//     },
//     complete: function() {
//         console.log('complete');
//     }
// }

// var source$ = Rx.Observable.create(subscriber);
// subscription = source$.map(x => x * x).subscribe(observer1);
// setTimeout(()=> {
//     subscription.unsubscribe();
// }, 3000);


// const source1$ = Rx.Observable.of([1, 2, 3]);
// const source2$ = Rx.Observable.of(['a', 'b', 'c']);

// const zipped$ = Rx.Observable.zip(source1$, source2$);

// zipped$.subscribe(
//     console.log,
//     null,
//     () => console.log('complete')
// )

// const source1$ = Rx.Observable.timer(500, 1000);
// const source2$ = Rx.Observable.timer(1000, 1000);
// const result$ = source1$.combineLatest(source2$);

// result$.subscribe(
//     console.log,
//     null,
//     () => console.log('complete')
// )

// const source$ = Rx.Observable.of(1,2,3).concat(Rx.Observable.of(4,5,6));
// const count$ = source$.count();
// console.log(count$);

// const source$ = Rx.Observable.range(1, 100).reduce((acc, current) => acc + current, 0).subscribe(
//     v => {
//         console.log('Value', v)
//     },
//     e => {
//         console.log('Error', e)
//     },
//     () => {
//         console.log('Completed')
//     }
// );


// const findIndex$ = Rx.Observable.of(3,1,4,1,5,9).findIndex(x => x % 2 === 0);

// console.info('tag', findIndex$)

// const source$ = Rx.Observable.range(1, 100).takeWhile(
//     value => value % 2 === 0
// ).subscribe(
//     v => {
//         console.log('Value', v)
//     },
//     e => {
//         console.log('Error', e)
//     },
//     () => {
//         console.log('Completed')
//     }
// );

const source$ = Rx.Observable.interval(1000);
const notifier$ = Rx.Observable.timer(2500);
const takeUnit$ = source$.takeUnit(notifier$);