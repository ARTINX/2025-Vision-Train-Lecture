---
theme: default
colorSchema: auto
routerMode: history
transition: slide-left
level: 1
layout: cover
download: true
---


# Lecture 1: Introduction

---
layout: default
--- 

**目录**

<Toc minDepth="1" maxDepth="1"></Toc>

---
layout: cover
---

# Linux && Linux Distributions

--- 
layout: default
---

## 操作系统（operating system）是什么?
<br></br>

- 管理，协调与调用计算机的各个设备（如内存，硬盘，输入设备等）。

- 规划处理器的使用，为电脑的每个**进程**分配CPU资源。
> **进程**: 正在运行中的程序。一般来说，一个CPU核心**只能同时**运行一个进程。超出核心数的程序靠操作系统的进程调度算法**伪装**成同时进行。

<br></br>
- 提供**用户接口**（或者说，提供一种**相对不那么麻烦**的计算机操作方式）。

--- 
layout: default
---

## Linux与Linux发行版

- Linux，通常指Linux内核，仅包含硬件管理、进程调度、内存管理、文件系统和网络通信等底层功能，而不包含GUI，桌面环境，用户界面与常用程序（命令行等）。Linux内核一般来说**无法**被用户直接使用。
- 包含上述内容，与用户直接交互的操作系统，一般指基于Linux内核的**Linux发行版**。

## Ubuntu

目前为止最常用的Linux发行版，稳定，社区生态丰富。队内小电脑的使用的是Ubuntu22.04。

> **为什么使用Linux?**
> - 强大的包管理器机制。常见的Linux发行版都拥有至少一个包管理器。在windows上需要花一整节lab课和一大坨助教头发才能配成的环境，在Linux下可能只需要一行命令。
> - 与windows相比相对较高的稳定性。这里的稳定性并不是指出现故障的概率小，而是相比闭源（代码不公开）的windows来说，开源的Linux对于更可能会有解决方案。
> - 简介的系统环境。windows为了操作的简便性添加了非常多的额外设计，导致计算机需要消耗很多额外的资源运行操作系统。使用linux则能够更大程度地利用电脑的性能。

---
layout: default
---

## 如何安装?

常见的安装方式有三种

> - WSL（Windows Subsystem for Linux）. WSL是微软为linux开发者提供的一套兼容层（对于初学者来说，可以理解为一个为linux特制的虚拟机），安装简便，运行快速。缺点是对于图形界面的支持不算友好，且容易出现一些奇怪的bug。
> 
> - 在虚拟机中安装。相较wsl来说，虚拟机对于图形化界面的支持比较友好，且能够获得比较完整的使用体验。但相应的，安装稍微繁琐一些，且性能损失较大，以及同样会出现bug的问题。
> 
> - 在硬盘中直接安装ubuntu。通过给硬盘分区或加装硬盘，ubuntu能够与windows同时存在（虽然同一时间只能使用一个系统）。直接安装ubuntu能避免许多虚拟机/wsl中会出现的问题，但相对来说步骤比较繁琐，且会有**丢失硬盘中所有数据**的风险。尽管如此，我们鼓励所有想要加入队伍的人或者想要加入计算机系的人尝试这种方式，并且，我们会尽最大努力提供帮助。使用原生ubuntu22.04的同学在面试时将会作为额外加分项。

**考虑wsl安装比较简便，安装教学将以wsl为例**

---
layout: two-cols-header
---

## WSL 与 Ubuntu

### 什么是 WSL

Windows Subsystem for Linux (WSL) 是一个能够在 Windows 上运行原生 Linux，安装简便。我们使用它来进行教学，可以在不使用双系统或虚拟机的情况下，以较好的性能运行一个 Linux 环境。

<!-- <img src="https://learn.microsoft.com/en-us/windows/images/wsl-icon.png" alt="WSL Logo" style="display: block; margin-left: auto; margin-right: auto; width: 200px;"/> -->

- [安装教程](https://docs.microsoft.com/zh-cn/windows/wsl/install)

安装好 WSL2 后，我们可以在 Microsoft Store 中搜索 Ubuntu 22.04 LTS 进行安装。

> 如果有喜欢的其他发行版（如 Arch，Debian 等），可以根据自己的喜好进行选择并自行配置开发环境。开发环境的配置我们会以 Ubuntu 22.04 LTS 为例进行讲解。

::left::

<img src="/img/ubuntu22.04.png" alt="WSL Logo" style="display: block; margin-left: auto; margin-right: auto;"/>

::right::
<br>
<br>
<br>

> 安装好后，先配置用户名和密码 <br> **注意**：密码不会显示在屏幕上，输入时不会有任何反馈。

---

### Ubuntu 22.04 LTS 开发环境配置

在 Linux 中，我们常使用包管理器来安装软件，Ubuntu 中的包管理器是 `apt`，可以使用 `apt` 命令来安装软件。apt默认从国外软件源获取软件进行安装（由于某些原因，大概率连不上），因此需要将软件源更换至国内的软件源镜像。

```bash {*}{lines: true}
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list # 更换软件源为 USTC 镜像
sudo sed -i 's/http:/https:/g' /etc/apt/sources.list # 使用 HTTPS 协议，防止运营商缓存劫持
sudo apt update # 更新软件源
sudo apt upgrade # 升级已安装的软件
sudo apt install build-essential cmake git # 安装基本的开发工具
```

<br></br>

> 有关这些命令的含义，请自行使用搜索引擎进行查找。

---
layout: default
---

## Shell && Terminal
<br></br>

- 一种通过命令与计算机交互的方式。
<br></br>
- 对于任何**想要加入视觉组**或者**想要进入计算机系**的同学，shell与terminal是**必须**熟练使用的东西，而这些在课堂上通常**不会**详细讲解。
<br></br>
- 有关如何在你的电脑上打开terminal，请使用搜索引擎。

[计算机缺失的一课](https://www.bilibili.com/video/BV1vt4y1R71v/?spm_id_from=333.337.search-card.all.click&vd_source=7abedfec08d3d35085e7c92173b424df)，有关shell, vim与git的介绍。南科大的课程不会覆盖其中的**绝大多数**内容，尽管这些内容通常会在计算机系课程的学习中发挥重要的作用。

[常见的shell命令](https://www.prepbytes.com/blog/linux/basic-shell-commands-in-linux/)。其中列出了几个最常用的shell命令。当然，掌握这些远远不够，但更多通常需要日积月累的学习与**合理利用搜索引擎**的能力

---
layout: cover
---

# Basis of Computer


---
layout: two-cols
--- 

## 计算机的组成
某种意义上的计导（

**CPU(中央处理器)**

电脑的中心计算单元，负责执行程序的指令。

**操作系统**

管理计算机硬件和软件资源的系统软件。

操作系统**不等同于**图形界面， 二者是两个不同的概念。

**内存**

计算机的临时存储器，存储正在运行的程序和数据。cpu通过寄存器访问内存。

**寄存器**

计算机的临时储存器，cpu能够直接访问。相比起内存容量更小，速度更快。

::right::

<br><br>

**GPU(图形处理器)**

负责输出图形的显示。由于计算显示内容的计算经常和矩阵运算有关，因此图形处理器也被用来进行一些ai相关的计算。

**硬盘**

计算机的永久存储器，存储操作系统和用户数据文件。

--- 
layout: cover
---

## 编程语言如何在计算机上运行？

---
layout: image-right
image: ./img/binary.png
--- 

<br></br>
## 可执行文件(机器码)

- 能够被计算机直接执行的文件

- 计算机**能且只能** "看得懂" 二进制串

- 本质上是一串一串的 0 和 1.

---
layout: image-right
image: ./img/assemble_demo.png
---

## 指令集 与 汇编语言

**指令**

- 计算机能直接执行的，具有特定含义的指令，例如寄存器拷贝，将内存。指令可以直接转换成二进制串。

**指令集**

- 计算机能够识别的所有指令的集合。不同架构的计算机（x86, arm, RISC-V, etc.）指令集不同，能直接执行的指令也不同。

**汇编语言**

- 一种由指令组成的低级语言。如右图。

---
layout: default
---

### 高级编程语言
- java, c, c++, python...
- 更容易编写与阅读，但需要一些手段处理成机器码
- example
```
int main{
    int a = 0;
    int b = 1;
    int c = a + b + 1;
    return 0;
}
```
在arm架构下，上面的代码转为汇编语言的样子是

```
main:
    mov r3, #0               // 将整数a初始化为0
    mov r4, #1               // 将整数b初始化为1
    add r5, r3, r4           // c = a + b
    add r5, r5, #1           // c = c + 1
    mov r0, #0               // 设置返回值为0
    bx lr                    // 返回

```




---
layout: default
---

## 从 C++代码 到 可执行文件

**预处理**
- 宏定义与展开, 头文件的展开（在后续的C++课程中，你会了解到宏与头文件的概念）

**编译**
- 高级语言 &rarr; 汇编语言
- 由编译器进行

**链接**
- 合并相同文件与不同文件中相关的代码，生成可执行文件


--- 
layout: cover
--- 

# Code Editor and IDE


--- 
layout: cover
--- 

# Git