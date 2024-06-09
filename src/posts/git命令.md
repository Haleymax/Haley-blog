---
icon: pen-to-square
date: 2024-06-02
category:
  - 工具
tag:
  - 工具
  - 编程
  - git
---
# git使用的基本命令

# 1.git配置

用户信息配置：

```shell
git config --global user.name "username"
git config --global user.email youaddress@email.com
```

查看配置文件：

```shell
git config --list
```

# 2.git工作区、暂存区和版本库

工作区：在电脑里能看见的目录

暂存区：stage或index。一般存放在 `.git`目录下的index文件中 `.git/index`

版本库：工作区有一个隐藏目录 `.git`,这个就是git的版本库

# 3.创建仓库

使用当前目录作为git仓库

```shell
git init
```

使用指定目录作为仓库

```shell
git init <diename>
```

从现有的仓库中拷贝项目

```shell
git clone <repo>
```

克隆指定目录

```shell
git clone <repo><directory>

#repo:Git仓库
#directory：本地仓库
```

# 4.基本操作

修改与提交：

```shell
git add  <filename>      添加文件到暂存区
git add .                将当前目录下所有文件添加到暂存区
git commit <filename>    提交暂存区到本地仓库
git commit -m "备注信息"  提交并自动写入备注信息
git diff                 比较文件不同，暂存区和工作区的差异
git reset                回退版本
git rm                   将文件从暂存区和工作区删除
git mv                   移动或重命名工作区文件
git checkout             分支切换
git switch               切换至具体的分支
git  restore             恢复或撤销文件都更改
```

提交日志：

```shell
git log                   查看历史提交记录
git blame <file>          以列表形式查看指定文件的历史修改记录
```

远程操作：

```shell
git remote                远程仓库操作
git fetch                 从远程获取代码库
git pull                  下载远程代码并合并
git push                  上传远程代码并合并
```

# 5.分支管理

创建分支：

```shell
git branch (branchname)
```

切换分支命令：

```shell
git cheackout (branchname)
```

合并分支：

```shell
git merge
```

列出分支：

列出分支基本命令：

```shell
git branch
#ps 若是没有参数，git branch会列出你所在本地的分支
```

默认分支：在执行git init的时候，默认会创建master分支

若要手动创建一个分支。执行 `git branch (branchname)`即可

删除分支：

```shell
git branch -d (branchname)
