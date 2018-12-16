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
// const source$ = Rx.Observable.interval(1000);
// const notifier$ = Rx.Observable.timer(2500);
// const takeUnit$ = source$.takeUnit(notifier$);
// var source = Rx.Observable.interval(500)
// var subject = new Rx.Subject()
// var multicasted = source.multicast(subject)
// var subscription1, subscription2, subscriptionConnect

// subscription1 = multicasted.subscribe({
// 	next: v => console.log('observerA: ' + v),
// })
// // 这里我们应该调用 `connect()`，因为 `multicasted` 的第一个
// // 订阅者关心消费值
// subscriptionConnect = multicasted.connect()

// setTimeout(() => {
// 	subscription2 = multicasted.subscribe({
// 		next: v => console.log('observerB: ' + v),
// 	})
// }, 600)

// setTimeout(() => {
// 	subscription1.unsubscribe()
// }, 1200)

// // 这里我们应该取消共享的 Observable 执行的订阅，
// // 因为此后 `multicasted` 将不再有订阅者
// setTimeout(() => {
// 	subscription2.unsubscribe()
// 	subscriptionConnect.unsubscribe() // 用于共享的 Observable 执行
// }, 2000)

// const $source = Rx.Observable.interval(5000);
// const $secondSource = Rx.Observable.interval(1000);

// const example = $source
// 	.withLatestFrom($secondSource)
// 	.map(([first, second]) => {
// 		return `First Source (5s): ${first} Second Source (1s): ${second}`;
// 	})

// const subscribe = example.subscribe(val => console.log(val));

// const $example = Rx.Observable.race(
// 	Rx.Observable.interval(1500),
// 	Rx.Observable.interval(2000),
// 	Rx.Observable.interval(1200),
// 	Rx.Observable.interval(1000).mapTo('1s won!')
// )

// const subscribe = $example.subscribe(val => console.log(val))

// // 每1秒发出值
// const source = Rx.Observable.interval(1000);
// // 以 -3, -2, -1 开始
// const example = source.startWith(-3, -2, -1);
// // 输出: -3, -2, -1, 0, 1, 2....
// const subscribe = example.subscribe(val => console.log(val));

// Rx.Observable.prototype.makeHot = function () {
//   const cold$ = this;
//   const subject = new Rx.Subject();
//   cold$.subscribe(subject);
//   return subject;
// }

// const makeTick$ = Rx.Observable.interval(1000).take(3).multicast(new Rx.Subject());
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 2000)

// makeTick$.connect()

// const makeTick$ = Rx.Observable.interval(1000).take(3).multicast(new Rx.Subject()).refCount();
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 2000)

// const subjectFactory = () => {
//   console.log('enter subjectFactory');
//   return new Rx.Subject();
// }

// const makeTick$ = Rx.Observable.interval(1000)
// 	.take(3)
// 	.multicast(subjectFactory)
// 	.refCount()
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 5000)


// const makeTick$ = Rx.Observable.interval(1000)
// 	.take(3)
// 	.publish()
// 	.refCount()
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 5000)

// const makeTick$ = Rx.Observable.interval(1000)
// 	.take(3)
//   .share()
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 5000)

// const makeTick$ = Rx.Observable.interval(1000)
// 	.take(3)
//   .publishLast()
//   .refCount()
  
// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 5000)

// const makeTick$ = Rx.Observable.interval(1000)
//   .take(3)
//   .do(x => console.log('source', x))
// 	.publishBehavior(-1)
// 	.refCount()

// makeTick$.subscribe(val => console.log(`First observer ${val}`))

// setTimeout(() => {
// 	makeTick$.subscribe(val => console.log(`Second observer ${val}`))
// }, 5000)

// console.log('beforr schedule');
// Rx.Scheduler.async.schedule(() => console.log('async'))
// Rx.Scheduler.asap.schedule(() => console.log('asap'))
// Rx.Scheduler.queue.schedule(() => console.log('queue'))
// console.log('after schedule');

const source$ = Rx.Observable.range(1, 3);
const asapSource$ = source$.observeOn(Rx.Scheduler.asap);

console.log('before subscribe');

asapSource$.subscribe(
  value => console.log('data', value),
  error => console.log('error', error),
  () => console.log('complete')
);

console.log('after subscribe');