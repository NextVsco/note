/* webp图片格式转化 */
const webp  = require("webp-converter");

const root = "C:/Users/Administrator.Y4EG0I8K9DP6X4O/Pictures/admin-test/"
const name = "chick"

/* png和webp格式互相转化 */
// const result = webp.cwebp("./test/" + name + ".png", "./test/" + name + ".webp", "-q 80");
// result.then((response) => {
//   console.log(response);
// });
/* .webp => .png */
const result = webp.dwebp(root + name + ".webp", root + name + ".png", "-o");
result.then((response) => {
  console.log(response);
});
