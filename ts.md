## TypeScript

# [基本类型](https://www.tslang.cn/docs/handbook/basic-types.html)
### boolean, number, string 
### 数组 number[] or Array < number > 
### 元组 Tuple[string, number]
~~~typescript
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
~~~
### 枚举 enum
~~~typescript
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
~~~
### any, object, undefined and null

### never
  - never类型表示的是那些永不存在的值的类型
  - never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给neve

### 类型断言
### 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
``` typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
or
  ``` typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
# [接口 interface](https://www.tslang.cn/docs/handbook/interfaces.html)
~~~typescript
interface LabelledValue {
  label: string;
}
~~~
  上面代码表示LabelledValue对象中存在一个string类型的label参数
### 可选属性
~~~typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
~~~
  接口里的属性不全都是必需的，只是在可选属性名字定义的后面加一个`?`符号

### 只读属性
~~~typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
~~~
  一些对象属性只能在对象刚刚创建的时候修改其值。

TypeScript具有ReadonlyArray < T > 类型
### 额外的属性检查
~~~typescript
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
~~~ 
### 函数类型
  (参数类型): 返回值
~~~typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
~~~
### 可索引的类型
~~~typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
~~~
### 类类型
~~~typescript
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
~~~
### 继承接口
B extends A, C
### 混合类型
~~~typescript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}
~~~
### PS：接口比较抽象，部分理解还不够
# [类 class](https://www.tslang.cn/docs/handbook/classes.html)
  ## 修饰符
- public 公共的
- private 私有的
- protected 受保护的 （私有的，但在派生类中仍然可以访问）
- readonly 只读的
- static 静态的 （类名.属性名|方法名）
- abstract 抽象的
## 存取器
可以有效的控制对对象成员的访问
~~~typescript
class User {
  private Name: String;
  get _Name() {
    return this.Name
  }
  set _Name(newName: String) {
    if (newName.length > 3) {
      this.Name = newName
    } else {
      console.error("Name format error")
    }
  }
}
~~~
## 抽象类
抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
~~~typescript
abstract class Department {
    constructor(public name: string) {
    }
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}
~~~
# [函数](https://www.tslang.cn/docs/handbook/functions.html)
### 特性都差不多
## this指向
javaScript中，每个函数都包含两个非继承而来的方法：call()方法和apply()方法，功能相同，传递参数方式不同
~~~javascript
function hello(thing) {
  console.log(this + " says hello " + thing);
}

hello.call("Yehuda", "world") //=> Yehuda says hello world
~~~
# [泛型](https://www.tslang.cn/docs/handbook/generics.html)
使组件的复用性更强
~~~typescript
function identity<T>(arg: T): T {
    return arg;
}

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
~~~
# [枚举](https://www.typescriptlang.org/docs/handbook/enums.html)
枚举允许我们定义一组命名常量。枚举需要初始化值
~~~typescript
// 数字会自增长
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
// 可以定义不同类型的成员
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
~~~
# 类型推论
在有些没有明确指出类型的地方，类型推论会帮助提供类型
~~~typescript
let zoo = [new Rhino(), new Elephant(), new Snake()];
~~~
这里，我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，因此不能推断出这个结果。 为了更正，当候选类型不能使用的时候我们需要明确的指出类型：
~~~typescript
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
~~~
如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]
# 类型兼容性
~~~typescript
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
~~~
TypeScript里的类型兼容性是基于结构子类型的。

在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口。

### 关于赋值
~~~typescript
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
~~~
编译器检查x中的每个属性，看是否能在y中也找到对应属性。 在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
### 比较两个函数
~~~typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
~~~
这里，x的每个参数在y中都能找到对应的参数，所以允许赋值。
第二个赋值错误，因为y有个必需的第二个参数，但是x并没有，所以不允许赋值。
