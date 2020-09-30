# Web Worker
JavaScript 语言采用的是单线程模型。
## 作用
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
## 目的
这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
## 限制
- 同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

- DOM 限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

- 通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

- 脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

- 文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

## 基本用法
### 主线程

```javascript
var worker = new Worker('work.js');
```
Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。

由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
```javascript
// 发送
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
// 接收
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
}
```
### Worker 线程
```javascript
this.addEventListener('message', function (e) {
  // 返回结果
  this.postMessage('You said: ' + e.data);
}, false);
```
Worker 线程内部需要有一个监听函数，监听message事件。this|self 代表子线程自身，即子线程的全局对象。
### Worker 线程加载脚本
```javascript
importScripts('script1.js','script2.js');
```
### 错误处理
主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
```javascript
// 主线程监听错误
worker.addEventListener('error', function (event) {
  // ...
});
```
### 关闭 Worker
```javascript
// 主线程
worker.terminate();
// Worker 线程
self.close();
```
# 内存垃圾回收
这是最初级的垃圾收集算法。此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”。如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。
```javascript
var o = { 
  a: {
    b:2
  }
}; 
// 两个对象被创建，一个作为另一个的属性被引用，另一个被分配给变量o
// 很显然，没有一个可以被垃圾收集

var o2 = o; // o2变量是第二个对“这个对象”的引用

o = 1;      // 现在，“这个对象”只有一个o2变量的引用了，“这个对象”的原始引用o已经没有

var oa = o2.a; // 引用“这个对象”的a属性
               // 现在，“这个对象”有两个引用了，一个是o2，一个是oa

o2 = "yo"; // 虽然最初的对象现在已经是零引用了，可以被垃圾回收了
           // 但是它的属性a的对象还在被oa引用，所以还不能回收

oa = null; // a属性的那个对象现在也是零引用了
           // 它可以被垃圾回收了
```
## 限制：循环引用
该算法有个限制：无法处理循环引用的事例。在下面的例子中，两个对象被创建，并互相引用，形成了一个循环。它们被调用之后会离开函数作用域，所以它们已经没有用了，可以被回收了。然而，引用计数算法考虑到它们互相都有至少一次引用，所以它们不会被回收。
```javascript
function f(){
  var o = {};
  var o2 = {};
  o.a = o2; // o 引用 o2
  o2.a = o; // o2 引用 o

  return "azerty";
}

f();

// 实例
var div;
window.onload = function(){
  div = document.getElementById("myDivElement");
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join("*");
};
// myDivElement 这个 DOM 元素里的 circularReference 属性引用了 myDivElement，造成了循环引用
```
## 标记清除算法
这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

# Class
```javascript
class People {}
```
转es5语法
```javascript
"use strict";

function _instanceof(left, right) { 
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { 
        return !!right[Symbol.hasInstance](left); 
    } else { 
        return left instanceof right; 
    } 
}

// 判断 Constructor.prototype 是否出现在 instance 实例对象的原型链上
function _classCallCheck(instance, Constructor) { 
    if (!_instanceof(instance, Constructor)) {
         throw new TypeError("Cannot call a class as a function"); 
    } 
}

var People = function People() {
  // 检查是否通过 new 调用
  _classCallCheck(this, People);
};
```
# Object
Obejct的特性，如何产出属性的，属性的配置，获取等操作

## .assign()
合并Object

用法：Object.assign(obj1,obj2,obj3...)

## .create()
方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
拷贝一个对象，如果拷贝对象本身有引用，则拷贝出来的也是引用
``` javascript
// 方式一
Object.create(obj)
// 方式二
Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
);
```

## .entries()
返回一个给定对象自身可枚举属性的键值对数组
``` javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

## .fromEntries()
方法把键值对列表转换为一个对象，与 Object.entries() 相反的方法

## .getOwnPropertyNames()
返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组

不能获取原型链上的属性名
``` javascript
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function() {};

function ChildClass() {
  this.prop = 5;
  this.method = function() {};
}

ChildClass.prototype = new ParentClass;
ChildClass.prototype.prototypeMethod = function() {};

var obj = new ChildClass()
// obj 下有 ["prop", "method","prototypeMethod","inheritedMethod"]

console.log(
  Object.getOwnPropertyNames(
    obj  // ["prop", "method"]
  )
);
```

## .freeze()
可以冻结一个对象。一个被冻结的对象再也不能被修改；
 - 冻结了一个对象则不能向这个对象添加新的属性，
 - 不能删除已有属性，
 - 不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。
 - 此外，冻结一个对象后该对象的原型也不能被修改。

该冻结是一个浅冻结
``` javascript
obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

obj1.internal.a // 'aValue'
```
深度冻结需要遍历对象内部指向的对象
### 深冻结函数
``` javascript
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}
```

## .isFrozen()
方法判断一个对象是否被冻结
``` javascript
// 一个非空对象默认也是非冻结的.
var oneProp = { p: 42 };
Object.isFrozen(oneProp) //=== false

// 让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,
// 因为p属性仍然是可以配置的(而且可写的).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp) //=== false

// 此时,如果删除了这个属性,则它会成为一个冻结对象.
delete oneProp.p;
Object.isFrozen(oneProp) //=== true
```

## .preventExtensions()
让一个对象变的不可扩展，也就是永远不能再添加新的属性。

## .seal()
方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置；当前属性的值只要原来是可写的就可以改变

## .isSealed()
方法判断一个对象是否被密封。

密封对象是指那些不可 扩展 的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。

## .defineProperty()
### 在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成。
直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
``` javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

console.log(object1.property1)  // 42
```
### 属性
- `configurable`
为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
- `enumerable`
为 true 时，该属性才会出现在对象的枚举属性中
- `value`
该属性对应的值
- `writable` 
为 true 时，属性的值才能被赋值运算符改变。
- `get`
属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
默认为 undefined。
- `set`
属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
默认为 undefined。

## .getOwnPropertyDescriptor()
指定对象上一个自有属性对应的属性描述符。
```javascript
const object1 = {
  property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1)  // { value: 42, writable: true, enumerable: true, configurable: true }
```

## .getOwnPropertyDescriptors()
获取一个对象的所有自身属性的描述符，同.getOwnPropertyDescriptor()区别为返回指定和所有
用法：Object.getOwnPropertyDescriptors(obj)

## .getPrototypeOf()
方法返回指定对象的原型
``` javascript
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

var reg = /a/;
Object.getPrototypeOf(reg) === RegExp.prototype; // true
```

## .getOwnPropertySymbols()
对应se6中的Symbol，方法返回一个给定对象自身的所有 Symbol 属性的数组
```javascript
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```

## .is()
方法判断两个值是否为同一个值
```javascript
Object.is(value1, value2);

if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}
```

## .isExtensible()
判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）
``` javascript
// 新对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty); // === true

// ...可以变的不可扩展.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false

// 密封对象是不可扩展的.
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false
```

## .keys()
方法会返回一个由一个给定对象的自身可枚举属性组成的数组，常用于获取对象长度（属性数量）

## .values()
方法返回一个给定对象自身的所有可枚举属性值的数组

## .setPrototypeOf()
### [避免使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
方法设置一个指定的对象的原型（即, 内部[[Prototype]]属性）到另一个对象或null

## .prototype.hasOwnProperty()
指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
用法：obj.hasOwnProperty(prop)

## .prototype.isPrototypeOf()
方法用于测试一个对象是否存在于另一个对象的原型链上
用法：prototypeObj.isPrototypeOf(object)

## .prototype.propertyIsEnumerable()
方法返回一个布尔值，表示指定的属性是否可枚举；
此方法可以确定对象中指定的属性是否可以被 for...in 循环枚举，但是通过原型链继承的属性除外
``` javascript
const object1 = {};
const array1 = [];
object1.property1 = 42;
array1[0] = 42;

console.log(object1.propertyIsEnumerable('property1'));
// expected output: true

console.log(array1.propertyIsEnumerable(0));
// expected output: true

console.log(array1.propertyIsEnumerable('length'));
// expected output: false
```

## .prototype.toLocaleString()
???

## .prototype.toString()
方法返回一个表示该对象的字符串

## .prototype.valueOf()
方法返回指定对象的原始值

## .arguments
是一个对应于传递给函数的参数的类数组对象

## .length
是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数
``` javascript
function a(name,...args){
  // args 返回其余传入值包成的数组
}
console.log(a.length)  // 1
```

## .name
属性返回函数实例的名称
