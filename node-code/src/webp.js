const webp  = require("webp-converter");

const root = "C:/Users/Administrator.Y4EG0I8K9DP6X4O/Pictures/Saved Pictures/"
const name = "ui"
// const result = webp.cwebp("./test/" + name + ".png", "./test/" + name + ".webp", "-q 80");
// result.then((response) => {
//   console.log(response);
// });

const result = webp.dwebp(root + name + ".webp", root + name + ".png", "-o");
result.then((response) => {
  console.log(response);
});
