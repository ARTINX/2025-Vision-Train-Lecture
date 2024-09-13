---
theme: default
colorSchema: auto
routerMode: history
favicon: 'https://cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png'
title: ARTINX 2025 视觉算法组培训 Lecture 3
info: ARTINX Visual 2025
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
level: 1
---

# Lecture 3

---
level: 1
---

## TOC

<Toc minDepth="2" maxDepth="2"></Toc>

---

## 预处理命令

以 `#` 开头，每句占一行或以 `\` 拼接下一行。

```cpp
#pragma once

#include <iostream>

#if defined(__cplusplus)
extern "C" {
# elif defined(_WIN32) || defined(_WIN64)
// some code
# endif

#ifdef __clang__
// some code
#endif

#define sum(a, b) \
do {              \
    (a) + (b);    \
} while(0)

#define ONE 1 /*useless*/
#undef sum
```
  
---

## 函数

函数是一段封装了一系列操作的代码块，可以通过函数名调用。使用函数可以提高代码的复用性和可读性。

- 函数声明:
```cpp
void bar();
int add(int, int);
int     foo   (int a, int b);
//|返回值|函数名|参数列表   |
//参数列表为空时，使用 `void` 表示，但一般省略。
//声明时可以省略参数名。
```



---

### 拓展阅读

- [Compile Phase](https://en.cppreference.com/w/cpp/language/translation_phases)
