# ES6+ 特性

## 核心特性总览

ES6（ES2015）及后续版本引入了大量新特性，极大提升了 JavaScript 的开发体验。

### 主要特性

- `let` / `const`：块级作用域变量声明
- 解构赋值
- 模板字符串
- 箭头函数
- 默认参数
- 展开/剩余运算符
- `class` 类
- 模块化（`import` / `export`）
- `Promise`
- `Map` / `Set`
- `Symbol`
- 迭代器/生成器
- `Proxy` / `Reflect`

## let / var / const

### 对比表

| 特性         | var        | let              | const            |
| ------------ | ---------- | ---------------- | ---------------- |
| **作用域**   | 函数作用域 | 块级作用域       | 块级作用域       |
| **变量提升** | 是         | 否（暂时性死区） | 否（暂时性死区） |
| **重复声明** | 允许       | 不允许           | 不允许           |
| **重新赋值** | 允许       | 允许             | 不允许           |
| **初始化**   | 可选       | 可选             | 必须             |

### 示例

```javascript
// var - 函数作用域
function test() {
  var a = 1;
  if (true) {
    var a = 2; // 同一个变量
  }
  console.log(a); // 2
}

// let - 块级作用域
function test() {
  let a = 1;
  if (true) {
    let a = 2; // 不同变量
  }
  console.log(a); // 1
}

// const - 不可重新赋值
const obj = { name: "foo" };
obj.name = "bar"; // ✅ 可以修改属性
obj = {}; // ❌ 不能重新赋值
```

## 箭头函数 vs 普通函数

### 区别

| 特性          | 普通函数 | 箭头函数             |
| ------------- | -------- | -------------------- |
| **this**      | 动态绑定 | 词法绑定（继承外层） |
| **arguments** | 有       | 无                   |
| **prototype** | 有       | 无                   |
| **构造函数**  | 可以     | 不可以               |
| **语法**      | 较繁琐   | 简洁                 |

### 示例

```javascript
// 普通函数
function foo() {
  console.log(this); // 取决于调用方式
  console.log(arguments); // 参数对象
}

// 箭头函数
const bar = () => {
  console.log(this); // 词法作用域的 this
  // console.log(arguments) // ❌ 报错
};

// 不能用作构造函数
new foo(); // ✅ 正常
new bar(); // ❌ 报错
```

### 使用场景

**适合箭头函数**

- 回调函数
- 简短的函数表达式
- 不需要动态 this 的场景

**不适合箭头函数**

- 对象方法（需要动态 this）
- 事件处理器（某些情况）
- 需要使用 arguments

## 数组去重

### 方法 1：Set（最简洁）

```javascript
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
// 或
const unique = Array.from(new Set(arr));
```

### 方法 2：filter + indexOf

```javascript
const unique = arr.filter((item, index) => {
  return arr.indexOf(item) === index;
});
```

### 方法 3：reduce + includes

```javascript
const unique = arr.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : [...acc, cur];
}, []);
```

### 方法 4：Map

```javascript
const map = new Map();
const unique = arr.filter((item) => {
  return !map.has(item) && map.set(item, true);
});
```

## 数组对象去重

### 方法 1：按唯一键去重（如 id）

```javascript
const list = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 1, name: "a2" },
];

const seen = new Set();
const uniqueById = list.filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});
```

### 方法 2：Map 一行写法（保留最后/第一次）

```javascript
// 保留最后一次出现
const uniqueLast = Array.from(
  new Map(list.map((item) => [item.id, item])).values()
);

// 保留第一次出现
const uniqueFirst = Array.from(
  list
    .reduce(
      (map, item) => (map.has(item.id) ? map : map.set(item.id, item)),
      new Map()
    )
    .values()
);
```

### 方法 3：多字段组合键去重

```javascript
const keyOf = (o) => `${o.type}::${o.id}`;
const uniqueMulti = Array.from(
  new Map(list.map((item) => [keyOf(item), item])).values()
);
```

### 方法 4：按对象“内容”去重（浅层）

```javascript
// 注意：仅适用于值为可 JSON 序列化的浅层数据
const serialize = (o) =>
  JSON.stringify(
    Object.keys(o)
      .sort()
      .reduce((acc, k) => {
        acc[k] = o[k];
        return acc;
      }, {})
  );

const uniqueByContent = Array.from(
  new Map(list.map((item) => [serialize(item), item])).values()
);
```

## 深浅拷贝

### 浅拷贝

只复制第一层，深层的对象仍然是引用。

```javascript
// 方法 1：展开运算符
const obj2 = { ...obj1 };

// 方法 2：Object.assign
const obj2 = Object.assign({}, obj1);

// 方法 3：数组的 slice/concat
const arr2 = arr1.slice();
const arr2 = arr1.concat();
```

### 深拷贝

完全复制，包括所有嵌套对象。

```javascript
// 方法 1：JSON（简单但有限制）
const obj2 = JSON.parse(JSON.stringify(obj1));
// ❌ 丢失：函数、undefined、Symbol、循环引用

// 方法 2：structuredClone（现代浏览器）
const obj2 = structuredClone(obj1);

// 方法 3：lodash
import { cloneDeep } from "lodash";
const obj2 = cloneDeep(obj1);

// 方法 4：手写递归
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```

## bind / call / apply

### 作用

三者都用于改变函数的 `this` 指向。

### 区别

| 方法    | 参数形式                   | 执行时机   |
| ------- | -------------------------- | ---------- |
| `call`  | `fn.call(obj, a, b, c)`    | 立即执行   |
| `apply` | `fn.apply(obj, [a, b, c])` | 立即执行   |
| `bind`  | `fn.bind(obj, a, b)`       | 返回新函数 |

### 示例

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: "Alice" };

// call - 离散参数，立即执行
greet.call(user, "Hello", "!"); // "Hello, Alice!"

// apply - 数组参数，立即执行
greet.apply(user, ["Hi", "."]); // "Hi, Alice."

// bind - 返回新函数
const boundGreet = greet.bind(user, "Hey");
boundGreet("?"); // "Hey, Alice?"
```

### 优先级

```javascript
new 绑定() > 显式绑定(call / apply / bind) > 隐式绑定 > 默认绑定;
```

## 模块化

### AMD / CMD / CommonJS / ES6 Module

| 规范           | 加载方式           | 使用场景       | 代表      |
| -------------- | ------------------ | -------------- | --------- |
| **AMD**        | 异步加载，依赖前置 | 浏览器         | RequireJS |
| **CMD**        | 异步加载，依赖就近 | 浏览器         | SeaJS     |
| **CommonJS**   | 同步加载           | Node.js        | Node.js   |
| **ES6 Module** | 静态加载           | 浏览器/Node.js | 现代标准  |

### ES6 Module 示例

```javascript
// 导出
export const name = "foo";
export function fn() {}
export default class {}

// 导入
import { name, fn } from "./module";
import MyClass from "./module";
import * as all from "./module";
```

### 导出方式总结

#### 1）命名导出（声明时导出）

```javascript
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export class Person {}
```

#### 2）命名导出（声明后统一导出）

```javascript
const PI = 3.14159;
function add(a, b) {
  return a + b;
}
class Person {}

export { PI, add, Person };
```

#### 3）命名导出重命名（as）

```javascript
const PI = 3.14159;
function add(a, b) {
  return a + b;
}

export { PI as CONST_PI, add as sum };
```

#### 4）默认导出（default）

```javascript
// 表达式/值
export default 42;

// 函数/类（可匿名）
export default function () {}
export default class {}

// 也可以先声明再默认导出
function main() {}
export default main;
```

#### 5）默认导出与命名导出并存

```javascript
export const VERSION = "1.0.0";
export function utils() {}

const App = {};
export default App;
```

对应导入：

```javascript
import App, { VERSION, utils } from "./module";
```

#### 6）再导出 / 聚合导出（re-export）

```javascript
// 直接从其他模块导出指定成员（可重命名）
export { foo, bar as baz } from "./other";

// 导出默认导出并改名
export { default as Other } from "./other";

// 导出对方的所有命名导出（不包含默认导出）
export * from "./other";
```

#### 7）注意事项

- 一个模块只有一个 `default` 导出，但可以有多个命名导出。
- 导入命名导出时名称需对齐（或用 `as` 重命名）；默认导出导入名可自定。
- `export * from` 不会带出默认导出，如需同时带出可搭配 `export { default as X } from '...'`。
