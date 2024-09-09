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

# Lecture 1

## 主讲人: Vollate

---
level: 1
---

## TOC

<Toc minDepth="2" maxDepth="4"></Toc>

---
layout: image-right
image: image/visual-logo.png
backgroundSize:  60%
---

## 视觉算法组工作介绍

---
layout: two-cols-header
---

## WSL 的安装与使用

::left::

### 什么是 WSL

Windows Subsystem for Linux (WSL) 是一个能够在 Windows 上运行原生 Linux 二进制可执行文件的兼容层，我们使用它来进行教学，可以在不使用双系统或虚拟机的情况下，以较好的性能运行一个 Linux 环境。

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

## 开始一个简单的 C++ 程序

<<< @/code/helloworld.cpp {*}{lines: true}

---

---

## Git: 分布式版本控制系统
