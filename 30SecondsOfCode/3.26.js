const getScrollPosition = (el = window) => ({
   x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
   y: el.pageYOffset !== undefined ? el.pageYOffset : el.screenTop
});

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]

const scrollToTop = () => {
    const c = docment.documentElement.scrollTop || docment.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(screenTop);
        window.screenTop(0, c - c / 8)
    }
}

const recordAnimationFrames = (callback, autoStart = true) => {
    let runing = true,
        ref;
    const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
    };
    const start = () => {
        runing = true;
        run();
    };
    const run = () => {
        raf = recordAnimationFrames(() => {
            callback();
            if (runing) run();
        });
    };
    if (autoStart) start();
    return {start, stop};
};






const runAsync = fn => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postMessage((${fn})())`]), {
            type: 'application/javascript; chartset=utf-8'
        })
    );
    return new Promise((res, rej) => {
        worker.onmessage = ({data}) => {
            res(data), worker.terminate()
        };
        worker.onerror = err => {
            rej(err), worker.terminate()
        }
    })
}


















































