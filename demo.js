let f = function () {
  this.a = 1;
  this.b = 2;
}
/* 这么写也一样
function f() {
 this.a = 1;
 this.b = 2;
}
*/
let o = new f(); // {a: 1, b: 2}

// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

console.log(f.b)