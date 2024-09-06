---
theme: default
colorSchema: auto
routerMode: history
favicon: 'https://cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png'
title: ARTINX 2025 视觉算法组培训
info: ARTINX Visual 2025
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
level: 1
---

# Lecture 2

---
level: 1
---

## TOC

<Toc minDepth="2" maxDepth="3"></Toc>

---

## C++ 介绍

### 历史

C++由Bjarne Stroustrup于1979年在C语言的基础上开发，目的是通过引入面向对象编程（OOP）的概念，如类、继承和多态，来增强C语言在复杂软件开发中的适应性。

### 特点

- 灵活：支持面向过程、面向对象、泛型等多种编程范式
- 高效：C++是一种静态类型、编译式编程语言。直接编译成机器码，运行效率高
- 和 C 语言兼容：C++ 代码可以无缝的和 C 代码进行链接
- 向下兼容：新版本的 C++ 语言标准会向下兼容旧版本的代码

---

## Hello, World!

一个简单的 C++ 程序

<<< @/code/hello_world.cpp {*}{lines: true}

编译运行：

```bash
g++ hello_world.cpp -o hello_world
./hello_world
```

### 关键字&标识符
关键字是 C++ 中具有特殊含义的保留字，它们用于表示语言的语法结构和控制指令，例如 `int, if, for, return` 等。由于关键字已经被语言定义，不能用作变量名、函数名或其他标识符。

标识符是程序员为变量、函数、类、对象等实体自定义的名称。标识符必须遵循一定的规则，如以字母或下划线开头，不能与关键字冲突，并且在命名时最好具有语义性，以便提高代码的可读性和可维护性。

---

## 基础数据类型

C++ 中的基本数据类型包括整型、浮点型、字符型、布尔型等。

### 整型
| 类型       | 关键字     | 字节数 | 取值范围                                |
|------------|------------|--------|-----------------------------------------|
| bool       | bool       | 1      | true/false                              |
| char       | char       | 1      | $-2^7$ ~ $2^7-1$                        |
| short      | short      | 2      | $-2^{15}$ ~ $2^{15}-1$                  |
| int        | int        | 4      | $-2^{31}$ ~ $2^{31}-1$                  |
| long       | long       | 4      | $-2^{31}$ ~ $2^{31}-1$                  |
| long long  | long long  | 8      | $-2^{63}$ ~ $2^{63}-1$                  |

---

无符号整型为上述整型类型前加 `unsigned` 关键字，取值范围为 $0$ ~ $2^n-1$，其中 $n$ 为整型字节数。有符号整形以 `signed` 关键字修饰，可省略。

> 注：不同CPU架构/编译器下，数据类型的字节数可能有所不同

#### 定长整型

C++11 引入了定长整型，如 `int8_t, uint8_t, int16_t, uint16_t` 等，确保了数据类型的字节数，保证了跨平台的兼容性 [Reference](https://en.cppreference.com/w/cpp/types/integer)

#### 存储格式

有符号整型采用[补码](https://zh.wikipedia.org/zh-cn/%E4%BA%8C%E8%A3%9C%E6%95%B8)存储，无符号整型采用原码存储。

#### 算术溢出

整型溢出是指整型变量的值超出了其数据类型所能表示的范围，导致结果不准确。例如，`int` 类型的变量最大值为 $2^{31}-1$，当其值超过这个范围时，会发生溢出，变为负数。

---

### 浮点型

| 类型       | 关键字     | 字节数 | 取值范围                                |
|------------|------------|--------|-----------------------------------------|
| float | float | 4 | 3.4e-38 ~ 3.4e38 |
| double | double | 8 | 1.7e-308 ~ 1.7e308 |
| long double | long double | 12 | 3.4e-4932 ~ 1.1e4932 |

浮点数采用[IEEE 754](https://zh.wikipedia.org/zh-cn/IEEE_754)标准存储，包括符号位、指数位和尾数位。

#### 定长浮点型(Since C++23)
从 C++23 开始，引入了定长浮点型，如 `float16_t, float32_t, float64_t` 等，确保了数据类型的字节数，保证了跨平台的兼容性 [Reference](https://en.cppreference.com/w/cpp/types/float)

---

#### 特殊值
- 正无穷、负无穷: $\infty, -\infty$
- NaN(Not a Number): 0/0, $\infty/\infty$ 等情况

```cpp 
std::numeric_limits<double>::infinity();
std::numeric_limits<double>::quiet_NaN();
std::numeric_limits<double>::signaling_NaN();
```

#### 精度问题和舍入误差
浮点数的精度有限，可能会出现舍入误差。
在进行浮点数比较时，应该使用误差范围进行比较，而不是直接比较两个浮点数的值。参见 [std::numeric_limits\<T>::epsilon()](https://en.cppreference.com/w/cpp/types/numeric_limits/epsilon)

#### 上溢和下溢
C++ 中浮点数的上下溢是由于浮点数的表示范围有限，导致运算结果超出最大或最小可表示值，分别返回无穷大或接近零的值。

---
layout: two-cols
---

### void 类型

`void` 类型表示没有类型，通常用于函数返回值为空或指针类型不确定的情况。 C 语言中，常用 `void*` 进行类型擦除

### 类型转换
- 显示类型转换：在需要时，可以使用强制类型转换将一个类型转换为另一个类型
  - C-style cast: `(type)expression`
  - C++ style cast: `static_cast, dynamic_cast, const_cast, reinterpret_cast`
- 隐式类型转换：隐式类型转换是指编译器在不需要显式指令的情况下自动进行的类型转换。常见的隐式类型转换包括整型提升、浮点数提升、算术类型转换等。

::right::

```cpp
int a = 10;
float b = (float)a; // C-style cast
double b = static_cast<double>(a); // C++ style cast
```

整形提升：`char -> int -> long -> long long`
原则：
- 低精度类型转换为高精度类型，计算时运算符两边的类型需要相等
- 长度小于 `int` 的整型提升为 `int`

浮点数提升：`float -> double -> long double`
原则：
- 低精度类型转换为高精度类型，计算时运算符两边的类型需要相等，整形转化为浮点数

---

```cpp
#include <iostream>

int main() {
    char a= 127;
    char b = 3;
    int c = a + b;
    std::cout << c << std::endl;
    return 0;
}
```

#### C++ style cast v.s. C-style cast

- `static_cast` 提供了编译期类型检查，避免了潜在的类型错误
- `static_cast` 不能用于无关类型之间的转换，如 `int` 转 `char`, 这时可以使用 `reinterpret_cast`进行二进制数据的直接转换。可能因为内存对齐问题导致未定义行为
- C-style cast 会忽略任何检查

---

### 常量和字面量
- 常量是指在程序运行过程中其值不会发生变化的量，使用 `const` 关键字进行声明，以保证其值不会被修改。该保护仅为编译期保护。
```cpp
constexpr int x = 10;
constexpr int y = 10;
constexpr int sum = x + y; // 编译期计算

const int a = 10;
a = 20; // Error
```

- 字面量是指在程序中直接出现的常量值，如 `10, 3.14, 'a'` 等。C++ 中的字面量包括整型、浮点型、字符型、字符串型、布尔型等。

```cpp
int a = 10; // 整型字面量
float b = 3.14; // 浮点型字面量
char c = 'a'; // 字符型字面量
bool d = true; // 布尔型字面量
char e[] = "Hello, World!"; // 字符串型字面量
```
整形和浮点型字面量可以使用后缀 `u, l, f` 等进行修饰，以表示其类型。

---

#### 字符串字面量
字符串字面量是由双引号括起来的字符序列，如 `"Hello, World!"`。字符串字面量是一个字符数组，以空字符 `\0` 结尾，表示字符串的结束。
- 常见的字符串编码方式有 ASCII 编码、UTF-8 编码、UTF-16 编码等。
- **转义字符**是指在字符串中以反斜杠 `\` 开头的字符，用于表示一些特殊字符，如 `\n` 表示换行符，`\t` 表示制表符等。要表示反斜杠本身，需要使用 `\\`。
- **原始字符串字面量**是指以 `R"()"` 包裹的字符串字面量，不会对转义字符进行转义，如 `R"(Hello, \n World!)"`。

为了支持 Unicode 字符串，C++11 引入了 `u8` 前缀，表示字符串使用 UTF-8 编码，如 `u8"你好，世界!"`，同时 wchar_t 类型也被引入，用于表示宽字符。

---

### 指针和引用
指针(pointer)是一个存储变量地址的变量，可以通过指针访问变量的值。引用(reference)是一个变量的别名，可以通过引用访问变量的值。
std::nullptr_t 是一个空指针类型，用于表示空指针。

```cpp
int a = 10;
int* p = &a; // 指针
int& r = a; // 引用

int* p = nullptr; // 空指针
*a = 11; // 通过指针访问变量
r = 12; // 通过引用访问变量
```

指针算术：
- 指针加减整数：指针加减整数会根据指针类型的大小进行移动`sizeof(type)`

指针和引用的区别：
- 指针可以被重新赋值，引用不能
- 指针可以为空，引用不能

---

### 复合数据类型

#### 数组

数组是一种存储相同类型数据的集合，数组的大小在声明时就确定，且不可改变。数组的元素可以通过下标访问，下标从 0 开始。

---
layout: two-cols
---

## Statement

<div v-click>
语句是依序执行的 C++ 程序片段,主要有以下几种：
<div v-after>
<span v-mark.circle.green="2">
1. 声明语句<br/>
2. 带标号语句<br/>
3. 表达式语句<br/>
4. 复合语句<br/>
</span>
</div>
5. 选择语句<br/>
6. 循环语句<br/>
7. 跳转语句<br/>
8. try 块<br/>
</div>


::right::

```cpp
// {} 用于定义复合语句
{
    int a = 1;
    std::cout << a << std::endl;
}
```

