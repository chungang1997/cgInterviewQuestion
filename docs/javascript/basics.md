# JavaScript 基础知识

## 数据类型

### 原始类型（Primitive Types）

- `string`：字符串
- `number`：数字
- `boolean`：布尔值
- `null`：空值
- `undefined`：未定义
- `symbol`：唯一标识符（ES6）
- `bigint`：大整数（ES2020）

### 引用类型（Reference Types）

- `object`：对象
  - `Array`：数组
  - `Function`：函数
  - `Date`：日期
  - `RegExp`：正则表达式
  - 等等...

## null vs undefined

### null

- 表示"空值"或"有意为空"
- 是一个对象类型（历史遗留问题）
- `typeof null === 'object'`

### undefined

- 表示"未定义"或"未赋值"
- 变量声明但未初始化时的默认值
- `typeof undefined === 'undefined'`

### 比较

```javascript
null == undefined; // true（相等运算符）
null === undefined; // false（严格相等）
```

## 闭包（Closure）

### 定义

闭包是函数与其词法环境的组合。

### 特点

- 内部函数可以访问外部函数的变量
- 即使外部函数已经执行完毕

### 应用场景

1. **私有化变量**：创建私有作用域
2. **缓存数据**：函数记忆
3. **防抖节流**：保存定时器
4. **迭代器**：维护状态
5. **模块化**：封装私有方法

### 注意事项

⚠️ 不当使用可能导致内存泄漏

## this 关键字

### 绑定规则

this 的值取决于函数的**调用方式**：

#### 1. 默认绑定

```javascript
function foo() {
  console.log(this); // 非严格: window, 严格: undefined
}
foo();
```

#### 2. 隐式绑定

```javascript
const obj = {
  foo() {
    console.log(this); // obj
  },
};
obj.foo();
```

#### 3. 显式绑定

```javascript
foo.call(obj); // this 指向 obj
foo.apply(obj); // this 指向 obj
foo.bind(obj)(); // this 指向 obj
```

#### 4. new 绑定

```javascript
function Foo() {
  this.name = "foo"; // this 指向新创建的实例
}
const f = new Foo();
```

#### 5. 箭头函数

```javascript
const obj = {
  foo: () => {
    console.log(this); // 取外层 this（词法作用域）
  },
};
```

## 原型链

### 核心概念

- 对象通过 `[[Prototype]]`（或 `__proto__`）指向原型
- 原型再指向原型，直到 `null`
- 属性查找沿链向上，找不到返回 `undefined`

### 原型链示例

```javascript
obj.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

## 堆与栈

### 栈（Stack）

- 存储：原始值、函数调用栈
- 特点：LIFO（后进先出）、容量小、速度快

### 堆（Heap）

- 存储：对象、闭包
- 特点：空间大、速度相对慢
- GC（垃圾回收）作用于堆
