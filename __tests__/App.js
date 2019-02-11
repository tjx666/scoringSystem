// const p = new Promise((resolve, reject) => {
//   resolve();
//   console.log(123);
// });

// p.then(() => {
//   console.log(234)
// })
const value = '@'
const result = value.trim() !== '' && !/^\d+(\.\d+)?$/.test(value);
console.log({ result });