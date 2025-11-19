# TypeScript 泛型

## 1. 泛型基础

```typescript
// 泛型函数 - 适用于多种类型
function identity<T>(arg: T): T {
    return arg;
}

// 使用方式
let output1 = identity<string>("hello"); // 显式指定类型
let output2 = identity(123); // 类型推断

// 泛型约束 - 限制类型范围
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity("hello"); // ✓ 字符串有 length
loggingIdentity([1, 2, 3]); // ✓ 数组有 length
```

## 2. 泛型接口

```typescript
// 泛型接口定义
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = function(x) {
    return x;
};

// 泛型接口 - 对象结构
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

let pair: KeyValuePair<string, number> = {
    key: "age",
    value: 25
};
```

## 3. 泛型类

```typescript
// 泛型类 - 适用于多种数据类型
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
```

## 4. 泛型工具类型

```typescript
// 获取对象属性的类型
type Person = { name: string; age: number; city: string };

// keyof 操作符
type PersonKeys = keyof Person; // "name" | "age" | "city"

// typeof 操作符
type NameType = Person["name"]; // string

// 泛型工具函数
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type PersonName = Pick<Person, "name">; // { name: string }

// 条件类型 + 泛型
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;

type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T2 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
```
