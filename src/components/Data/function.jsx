// jshint esversion:8
function ranArr(n) {
  let newArr = [];
  for (var i = 0; i < n; i++) {
    var nw = parseInt(Math.random() * n) + 1;
    newArr.push(nw);
  }
  return newArr;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export { ranArr, sleep };
