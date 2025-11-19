# TypeScript 装饰器

## 1. 类装饰器

```typescript
// 类装饰器 - 修改类构造函数
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// 类装饰器工厂 - 带参数的装饰器
function logClass(message: string) {
    return function(constructor: Function) {
        console.log(`${message}: ${constructor.name}`);
    };
}

@logClass("创建类")
@sealed
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

## 2. 方法装饰器

```typescript
// 方法装饰器 - 记录方法调用
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`调用方法: ${propertyKey}`);
        console.log(`参数: ${JSON.stringify(args)}`);

        const result = originalMethod.apply(this, args);
        console.log(`返回值: ${JSON.stringify(result)}`);

        return result;
    };
}

class Calculator {
    @logMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(1, 2); // 会输出详细日志
```

## 3. 属性装饰器

```typescript
// 属性装饰器 - 验证属性值
function validateEmail(target: any, propertyKey: string) {
    let value: string;

    const getter = function() {
        return value;
    };

    const setter = function(newVal: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newVal)) {
            throw new Error("无效的邮箱地址");
        }
        value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
}

class User {
    @validateEmail
    email: string;
}

const user = new User();
user.email = "test@example.com"; // ✓
// user.email = "invalid-email"; // ✗ 抛出错误
```

## 4. 参数装饰器

```typescript
// 参数装饰器 - 标记必填参数
function required(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数 ${parameterIndex} 在方法 ${propertyKey} 中被标记为必填`);
}

class UserService {
    createUser(@required name: string, @required email: string, age?: number) {
        console.log(`创建用户: ${name}, ${email}`);
    }
}

// 装饰器执行顺序：属性/方法/参数装饰器 → 类装饰器
// 同级别装饰器：从下往上执行
