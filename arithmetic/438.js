var findAnagrams = function (s, p) {
    const pMap = {};
    for (const char of pattern) {
        pMap[char] = ~~(pMap[char]) + 1;
    }
    let result = [];
    let count = p.length;
    for (let i = 0; i < p.length; ++i) {
        if (pMap[s[i]] !== undefined && pMap[s[i]]-- > 0) {
            --count;
        }
    }
    for (let i = 0; i < s.length - p.length + 1; ++i) {
        if (count === 0) {
            result.push(i);
        }
        if (pMap[s[i]] !== undefined && pMap[s[i]]++ >= 0) {
            ++count;
        }
        if (pMap[s[i + p.length]] !== undefined && pMap[s[i + p.length]]-- > 0) {
            --count;
        }
    }
    return result;
}