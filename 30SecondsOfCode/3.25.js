/**
 * Created by chenjinxin on 2018/3/25.
 */
// union([1, 2, 3], [4, 3, 2]);// [1,2,3,4]

// const union = (a, b) => [...new Set([...a, ...b])]、

// unzip([['a', 1, true], ['b', 2, false]]); //[['a', 'b'], [1, 2], [true, false]]
// const unzip = arr =>
//   arr.reduce(
//     (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
//     Array.from({
//       length: Math.max(...arr.map(x => x.length))
//     }).map(x => [])
//   );
//
// const unzip = arr =>
//   arr.reduce(
//     (acc, val) => (val.forEach((v, i) => acc[i].push(v), acc)),
//     Array.from({
//       length: Math.max(...arr.map(x => x.length))
//     })
//   )
//
//
// const unzio = arr => {
//   arr.reduce(
//     (acc, val) => (val.forEach((v, i) => acc[i].push(v), acc)),
//     Array.from({
//       length: Math.max(...arr.map(x => x.length))
//     })
//   )
// }



const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({length: arrays.length}, (_, k) => arrays[k][i]);
  })
}








