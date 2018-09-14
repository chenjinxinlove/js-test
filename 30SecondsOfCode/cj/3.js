const uncurry = (fn, n = 1) => (...args) => {
    const next = acc => args => args.reduce((x, y) => x(y), acc);
    if (n > args.length) throw new RangeError('Arguments too few!');
    return next(fn)(args.slice(0, n));
};

const add = x => y => z => x + y + z;
const uncurriedAdd = uncurried(add, 3);
uncurriedAdd(1, 2, 3)