# Git 基本使用指南

Git 是一个分布式版本控制系统，广泛用于代码管理和协作开发。以下是 Git 的基本使用方法。

## 安装 Git

在 [Git 官方网站](https://git-scm.com/) 下载并安装适合您操作系统的版本。

## 配置 Git

安装完成后，配置用户名和邮箱：

```bash
# 增加测试
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 初始化仓库

创建一个新的 Git 仓库：

```bash
git init
```

## 克隆仓库

从远程仓库克隆代码：

```bash
# 会克隆仓库的默认分支（通常是 main 或 master，具体取决于仓库的配置）。
git clone <repository-url>
# 会克隆指定的分支，取决分支名
git clone -b <分支名> <repository-url>
```

## 添加文件到暂存区

将文件添加到暂存区：

```bash
git add <file-name>
```

添加所有文件：

```bash
git add .
```

## 提交更改

提交暂存区的更改：

```bash
git commit -m "提交说明"
```

## 查看状态

查看当前仓库状态：

```bash
git status
```

## 查看日志

查看提交历史：

```bash
git log
```

## 推送到远程仓库

将本地提交推送到远程仓库：

```bash
git push origin <branch-name>
```

## 拉取远程更新

从远程仓库拉取最新代码：

```bash
# 注意 git pull默认会直接将远程代码与本地代码进行合并，历史记录中会出现多余的合并记录，不利于追溯和版本的清晰性
git pull origin <branch-name>
# --rebase 会将当前的提交放到最后，保持历史的干净
git pull origin <branch-name>  --rebase # 建议使用
```

## 创建分支

创建新分支：

```bash
git branch <branch-name>
```

切换到新分支：

```bash
git checkout <branch-name>
```

## 合并分支

将分支合并到当前分支：

```bash
git merge <branch-name>
```

## 删除分支

删除本地分支：

```bash
git branch -d <branch-name>
```

删除远程分支：

```bash
git push origin --delete <branch-name>
```

## 使用 Rebase

Rebase 是一种将分支上的提交应用到另一个分支的方式。它可以保持提交历史的整洁，避免产生多余的合并提交。

### 使用方法

将当前分支的提交应用到目标分支：

```bash
git rebase <branch-name>
```

解决冲突后继续 Rebase：

```bash
git rebase --continue
```

取消 Rebase 操作：

```bash
git rebase --abort
```

### Rebase 的优势

- **保持提交历史整洁**：Rebase 会将提交线性化，避免产生多余的合并提交。
- **更容易理解历史记录**：线性的提交历史更易于阅读和理解。
- **适合个人开发**：在个人开发中，Rebase 可以帮助整理提交记录，使其更清晰。

## 常用命令总结

| 命令            | 功能             |
| --------------- | ---------------- |
| `git init`      | 初始化仓库       |
| `git clone`     | 克隆远程仓库     |
| `git add`       | 添加文件到暂存区 |
| `git commit`    | 提交更改         |
| `git status`    | 查看仓库状态     |
| `git log`       | 查看提交历史     |
| `git push`      | 推送到远程仓库   |
| `git pull`      | 拉取远程更新     |
| `git branch`    | 创建或查看分支   |
| `git checkout`  | 切换分支         |
| `git merge`     | 合并分支         |
| `git branch -d` | 删除本地分支     |
| `git rebase`    | 整理提交历史     |

## 参考资料

- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 书籍](https://git-scm.com/book)
- [Git 图像化工具 source tree](https://www.sourcetreeapp.com/)

希望这篇指南能帮助您快速上手 Git！
