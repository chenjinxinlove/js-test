// var myPow = function(x, n) {
//     if(n < 0) {
//         x = 1 / x
//         n = -n
//     }
//     var pow = 1
//     while(n) {
//         if(n && 1) {
//             pow *= x
//         }      
//         n--
//     }
//     return pow
// };

// console.log(myPow(-1.00000, -2147483648))
// var reverseStr = function(s, k) {
//     let length = s.length;
//     let cursor = 0;
//     while (cursor < length) {
//         if (cursor + k <= length) {
//             s = s.substring(0, cursor) + s.substring(cursor, cursor + k).split("").reverse().join("") + s.substring(cursor + k, length);
//         } else if (cursor + k > length) {
//             s = s.substring(0, cursor) + s.substring(cursor, length).split("").reverse().join("");
//         }
//         cursor += 2 * k;
//     }
//     return s;
// };

// console.log(reverseStr("abcdefg", 2))

// var findContentChildren = function(g, s) {
//     var sortg = g.sort((a,b) => a-b);
//     var sorts = s.sort((a,b) => a-b);

//     var si = 0, gi = 0;
//     var res = 0
//     while(gi < sortg.length && si < sorts.length) {
//         if(sorts[si] >= sortg[gi]) {
//             res++
//             si++
//             gi++
//         }else{
//             gi++
//         }
//     }
//     return res
// };
// console.log(findContentChildren([10,9,8,7], [5,6,7,8]))

// var isSubsequence = function(s, t) {
//     if (s.length === 0) {
//         return true
//     }
//     let i = 0
//     for(let key in t) {
//         if (t[key] === s[i]) {
//             i =  i + 1
//             if (i === s.length) {
//                 return true
//             }
//         }
//     }
//     return false
// };

// isSubsequence("acb", "ahbgdc")