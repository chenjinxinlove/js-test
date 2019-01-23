// 77. 组合
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let res = []
    if (n <= 0 || k <= 0 || k > n){
        return res
    }
    let c = []
    generateCombinations(1, c)
    function generateCombinations(start, c) {
        if (c.length === k) {
            res.push(c)
            return
        }
        for(let i = start; i <= n; i++) {
            generateCombinations(i+1, c.concat(i))
        }
        return
    }
    return res
};
console.log(combine(4, 2))