# TypeScript 高级类型

## 1. 映射类型（Mapped Types）

```typescript
// 将类型的所有属性变为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 将类型的所有属性变为只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 使用示例
interface User {
    name: string;
    age: number;
}

type PartialUser = Partial<User>; // 所有属性可选
type ReadonlyUser = Readonly<User>; // 所有属性只读
```

## 2. 条件类型（Conditional Types）

```typescript
// 基本语法 T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // truetype B = IsString<number>; // false

// 提取类型
type ReturnType<T extends (...args: any[]) => any>
    = T extends (...args: any[]) => infer R ? R : any;

function foo() { return { name: "张三" }; }
type FooReturn = ReturnType<typeof foo>; // { name: string }
```

## 3. 常用工具类型

```typescript
// Partial - 所有属性可选
interface User {
    name: string;
    age: number;
}
type PartialUser = Partial<User>;

// Required - 所有属性必选
type RequiredUser = Required<User>;

// Pick - 选择部分属性
type UserName = Pick<User, 'name'>;

// Omit - 排除部分属性
type UserWithoutAge = Omit<User, 'age'>;

// Record - 创建键值对类型
type PageInfo = Record<string, { title: string }>;

// Exclude - 排除联合类型中的某些类型
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract - 提取联合类型中的某些类型
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

## 4. 类型守卫（Type Guards）

```typescript
// typeof 类型守卫
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

// instanceof 类型守卫
class Dog {
    bark() { console.log("汪汪"); }
}

class Cat {
    meow() { console.log("喵喵"); }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

// 自定义类型守卫
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
```
