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


// 17. 电话号码的字母组合

// /**
//  * @param {string} digits
//  * @return {string[]}
//  */
// var letterCombinations = function(digits) {
//     const letterMap = [
//         " ",
//         "",
//         "abc",
//         "def",
//         "ghi",
//         "jkl",
//         "mno",
//         "pgrs",
//         "tuv",
//         "wxyz"
//     ]
//     let res = []
//     findCombination(0, "")
//     function findCombination(index, s) {
//         if(index === digits.length) {
//             res.push(s)
//             return 
//         }
//         let c = digits[index]
//         let letters = letterMap[c]
//         debugger
//         for(let i = 0; i < letters.length; i++) {
//             findCombination(index+1, s + letters[i])
//         }
//         return
//     }
//     return res
// };
// letterCombinations("23")

// 46. 全排列

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let res = [[nums.shift()]];
    
    while (nums.length) {
        let num = nums.shift();
        let temp = [];
        
        for (let i = 0; i < res.length; i++) {
            let len = res[i].length;
            for (let j = 0; j <= len; j++) {
                let cur = res[i].slice();
                cur.splice(j, 0, num)
                temp.push(cur);
            }
        }
        res = temp;
    }
    return res;
 }
permute([1,2,3])