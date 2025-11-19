# TypeScript 基础类型

## 1. TypeScript 的基本类型有哪些？

```typescript
// 基本类型
let name: string = "张三";
let age: number = 25;
let isActive: boolean = true;
let data: null = null;
let undef: undefined = undefined;

// 数组类型
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// 元组类型
let person: [string, number] = ["张三", 25];

// 枚举类型
enum Color { Red, Green, Blue }
let c: Color = Color.Red;

// 任意类型
let anyValue: any = "任意值";

// void 类型
function log(): void {
    console.log("无返回值");
}
```

## 2. 联合类型和交叉类型的区别？

```typescript
// 联合类型 - 可以是多种类型之一
let value: string | number;
value = "hello"; // ✓
value = 123; // ✓

// 交叉类型 - 必须同时满足多种类型
interface A { a: string; }
interface B { b: number; }
type AB = A & B; // 必须包含 a 和 b

let ab: AB = {
    a: "hello",
    b: 123
};
```

## 3. type 和 interface 的区别？

```typescript
// interface - 主要用于定义对象结构
interface Person {
    name: string;
    age?: number; // 可选属性
}

// type - 更灵活，可以定义任何类型
type PersonType = {
    name: string;
    age?: number;
};

// type 可以定义联合类型
type Status = "success" | "error" | "loading";

// interface 可以继承和声明合并
interface Employee extends Person {
    salary: number;
}
```

## 4. 类型断言的用法？

```typescript
// 尖括号语法
let someValue: any = "hello world";
let strLength: number = (<string>someValue).length;

// as 语法（推荐）
let strLength2: number = (someValue as string).length;

// 非空断言
function processValue(value: string | null) {
    console.log(value!.toUpperCase()); // ! 表示确定不为 null
}
```
