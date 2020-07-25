# TypeScript

## 基本类型
### boolean 
### number 
### string 
### 数组 number[] or Array<number> 
### 元组 Tuple [string, number]
~~~
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
~~~
### 枚举 enum
~~~
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
~~~
### any
### undefined and null
### never
- never类型表示的是那些永不存在的值的类型
- never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给neve
### object

### 类型断言
### 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
or
```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
## 接口 interface
~~~
interface LabelledValue {
  label: string;
}
~~~
上面代码表示LabelledValue对象中存在一个string类型的label参数
### 可选属性
~~~
interface SquareConfig {
  color?: string;
  width?: number;
}
~~~
接口里的属性不全都是必需的，只是在可选属性名字定义的后面加一个`?`符号

### 只读属性
~~~
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
~~~
一些对象属性只能在对象刚刚创建的时候修改其值。

TypeScript具有ReadonlyArray<T>类型
### 额外的属性检查
~~~
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
~~~ 