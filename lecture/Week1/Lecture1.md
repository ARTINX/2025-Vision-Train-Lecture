---
theme: default
colorSchema: auto
routerMode: history
transition: slide-left
level: 1
layout: cover
---


# Lecture 1: Introduction

---
layout: default
--- 

**目录**

<Toc minDepth="1" maxDepth="2" layout="2"></Toc>

---
layout: two-cols
--- 

# 计算机的组成
某种意义上的计导（

**CPU(中央处理器)**

电脑的中心计算单元，负责执行程序的指令。

**操作系统**

管理计算机硬件和软件资源的系统软件。

操作系统**不等同于**图形界面， 二者是两个不同的概念。

**内存**

计算机的临时存储器，存储正在运行的程序和数据。

**硬盘**

计算机的永久存储器，存储操作系统和用户数据文件。

::right::

<br><br>

**GPU(图形处理器)**

负责输出图形的显示。由于计算显示内容的计算经常和矩阵运算有关，因此图形处理器也被用来进行一些ai相关的计算。

--- 
layout: cover
---

# 编程语言如何在计算机上运行？

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
layout: default
---

## 汇编语言 与 指令集

**汇编语言**

- 一种低级语言，能够直接与二进制指令对应

---
layout: default
---

### 高级编程语言

---
layout: default
---

## 从 C++代码 到 可执行文件

---
layout: default
---

# Linux && Linux Distributions

---
layout: default
---

## Shell

---
layout: two-cols-header
---

## WSL 与 Ubuntu

### 什么是 WSL

Windows Subsystem for Linux (WSL) 是一个能够在 Windows 上运行原生 Linux，安装简便。我们使用它来进行教学，可以在不使用双系统或虚拟机的情况下，以较好的性能运行一个 Linux 环境。

<img src="https://learn.microsoft.com/en-us/windows/images/wsl-icon.png" alt="WSL Logo" style="display: block; margin-left: auto; margin-right: auto; width: 200px;"/>

- [安装教程](https://docs.microsoft.com/zh-cn/windows/wsl/install)

安装好 WSL2 后，我们可以在 Microsoft Store 中安装 Ubuntu 22.04 LTS。

> 如果有喜欢的其他发行版（如 Arch，Debian 等），可以根据自己的喜好进行选择并自行配置开发环境。开发环境的配置我们会以 Ubuntu 22.04 LTS 为例进行讲解。

::right::

安装好后，先配置用户名和密码

<img src="/img/ubuntu22.04.png" alt="WSL Logo" style="display: block; margin-left: auto; margin-right: auto;"/>

<br/>

> **注意**：密码不会显示在屏幕上，输入时不会有任何反馈。

---

### Ubuntu 22.04 LTS 开发环境配置

在 Linux 中，我们常使用包管理器来安装软件，Ubuntu 中的包管理器是 `apt`，我们可以使用 `apt` 来安装软件。执行下面的命令来更新软件源并安装开发环境。

```bash {*}{lines: true}
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list # 更换软件源为 USTC 镜像
sudo sed -i 's/http:/https:/g' /etc/apt/sources.list # 使用 HTTPS 协议，防止运营商缓存劫持
sudo apt update # 更新软件源
sudo apt upgrade # 升级已安装的软件
sudo apt install build-essential cmake git # 安装基本的开发工具
```

--- 
layout: default
--- 

# 代码编辑器与IDE


--- 
layout: default
--- 

# Git