---
icon: pen-to-square
date: 2024-06-12
category:
  - C++
tag:
  - C++
  - 编程

sticky: true
# 此页面会出现在星标文章中

order: 1
# 设置作者
author: Ms.Huang

---

# Lua C API 概述

Lua C API 是 Lua 提供的一组函数，用于与 C/C++ 语言进行交互。这些函数使得你可以在 C/C++ 程序中创建 Lua 环境、操作 Lua 栈、调用 Lua 函数、注册 C 函数供 Lua 使用等等。

## 1、Lua 状态对象

在 C/C++ 中使用 Lua C API，需要首先获取一个 Lua 状态对象 `lua_State*`，它是 Lua 环境的核心。通过 `luaL_newstate()` 函数创建一个新的 Lua 状态对象：

cpp

复制代码

`lua_State *L = luaL_newstate();`

## 2、Lua 栈操作

Lua 栈是 Lua 程序和 C/C++ 程序之间的数据交换区域。栈的底部是索引为 `1` 的位置，顶部是索引为 `-1` 的位置。

### 2.1、压入数据到 Lua 栈

* `lua_pushnumber(L, double n)`：将一个双精度浮点数 `n` 压入 Lua 栈。
* `lua_pushinteger(L, lua_Integer n)`：将一个整数 `n` 压入 Lua 栈。
* `lua_pushstring(L, const char *s)`：将一个字符串 `s` 压入 Lua 栈。

### 2.2、从 Lua 栈获取数据

* `lua_isnumber(L, int index)`：判断指定索引处的值是否为数字。
* `lua_tonumber(L, int index)`：将指定索引处的值转换为双精度浮点数。
* `lua_tointeger(L, int index)`：将指定索引处的值转换为整数。
* `lua_tostring(L, int index)`：将指定索引处的值转换为字符串。

### 2.3、栈操作

* `lua_gettop(L)`：获取栈顶索引（栈中元素个数）。
* `lua_settop(L, int index)`：设置栈顶索引。
* `lua_pop(L, int n)`：弹出栈顶 `n` 个元素。

## 3、调用 Lua 函数

### 3.1、调用全局函数

* `lua_getglobal(L, const char *name)`：获取全局变量 `name` 的值压入栈。
* `lua_call(L, int nargs, int nresults)`：调用栈顶函数。

### 3.2、注册 C 函数供 Lua 使用

#### 3.2.1、注册到全局

* `lua_register(L, const char *name, lua_CFunction f)`：注册一个全局函数 `name`，使其在 Lua 中可以直接调用。

#### 3.2.2、注册到表（Lua 5.2 及以上）

* `luaL_newlib(L, const luaL_Reg *l)`：创建一个新的表，并将函数注册到表中。
* `luaL_setfuncs(L, const luaL_Reg *l, int nup)`：将函数注册到当前栈顶的表中。

## 4、错误处理

### 4.1、获取和处理错误信息

* `lua_pcall(L, int nargs, int nresults, int msgh)`：调用栈顶函数，并处理可能发生的错误。
* `luaL_loadfile(L, const char *filename)`：加载文件为一个 Lua 函数。

## 5、关闭 Lua 环境

### 5.1、清理资源

* `lua_close(L)`：关闭 Lua 环境，释放资源。

## 6、示例：在 C++ 中执行 Lua 脚本

```cpp
#include <lua.hpp>

int main() {
    lua_State *L = luaL_newstate();
    luaL_openlibs(L); // 打开 Lua 标准库

    if (luaL_loadfile(L, "script.lua") || lua_pcall(L, 0, 0, 0)) {
        fprintf(stderr, "Error: %s\n", lua_tostring(L, -1));
        lua_close(L);
        return 1;
    }

    lua_close(L);
    return 0;
}

```

## 7、C++调用Lua

### 7.1、C++获取Lua值

* 使用lua_getglocal来获取值，然后将其压栈

* 使用lua_toXXX将栈中元素取出转成相应的C++类型的值

* 如果lua值为table类型的话，通过lua_getfield和lua_setfiled获取和修改表中元素的值

### 7.2、C++调用lua函数

* 使用lua_getglobal来获取函数，然后将其压入栈

* 如果这个函数有参数的话，就需要依次将函数的参数也压入栈

* 这些准备工作就绪后调用lua_pcall开始调用函数了，调用完成后将返回值压入栈中

**示例：**

hello.lua

```lua
str = "I am x-man."
tbl = {name = "DC", id = 20114442}
function add(a,b)
    return a + b
end
```

Lua1.cpp

```cpp
#include <iostream>
#include <string.h>
using namespace std;

extern "C"
{
#include "lua.h"
#include "lauxlib.h"
#include "lualib.h"
}
int main()
{
    //1.创建Lua状态，返回一个指向堆栈的指针
    lua_State *L = luaL_newstate();
    if (L == NULL)
    {
        return;
    }

    //2.加载lua文件
    int bRet = luaL_loadfile(L, "hello.lua");
    if (bRet)
    {
        cout << "load file error" << endl;
        return;
    }

    //3.运行lua文件
    bRet = lua_pcall(L, 0, 0, 0);
    if (bRet)
    {
        cout << "pcall error" << endl;
        return;
    }

    //4.读取全局变量，
    // 1.把 str 压栈 2.由lua去寻找全局变量str的值，并将str的值返回栈顶（替换str）
    // 如果存在相同命名的其他变量、table或函数，就会报错（读取位置发生访问冲突）
    lua_getglobal(L, "str");
    // -1取出栈顶元素，转化为string
    string str = lua_tostring(L, -1);
    cout << "str = " << str.c_str() << endl;

    //5.读取table，把table压栈
    lua_getglobal(L, "tbl");
    //-------------------------------
    // 1.把name压入栈中，2.由lua去寻找table中name键的值，并将键值返回栈顶（替换name）
    // 相当于lua_pushstring(L, "name") + lua_gettable(L, -2)执行结果是一样的
    lua_getfield(L, -1, "name");
    // 把name压入栈中
    //lua_pushstring(L, "name");
    // 弹出栈上的name，并从表中找到name的键值，把结果放在栈上相同的位置
    //lua_gettable(L, -2);
    //---------------------------------
    str = lua_tostring(L, -1);
    // 因为table在栈顶的下面，所以取-2，把id压栈，由lua找到table中id键的值，并返回栈顶（替换id）
    lua_getfield(L, -2, "id");
    // id的值已经在栈顶，取-1
    int id = lua_tonumber(L, -1);
    cout << "tbl:name = " << str.c_str() << endl;
    cout << "tbl:id = " << id << endl;

    // 读取函数，
    // 1.将函数add放入栈中，2.由lua去寻找函数add，并将函数add返回栈顶（替换add）。
    lua_getglobal(L, "add");        // 获取函数，压入栈中
    lua_pushnumber(L, 10);            // 压入第一个参数
    lua_pushnumber(L, 20);            // 压入第二个参数
    // 栈过程：参数出栈->保存参数->参数出栈->保存参数->函数出栈->调用函数->返回结果入栈
    // 调用函数，调用完成以后，会将返回值压入栈中，2表示参数个数，1表示返回结果个数。
    int iRet = lua_pcall(L, 2, 1, 0);
    if (iRet)                        
    {
        // 调用出错
        const char *pErrorMsg = lua_tostring(L, -1);
        cout << pErrorMsg << endl;
        lua_close(L);
        return;
    }
    if (lua_isnumber(L, -1))        //取值输出
    {
        int fValue = lua_tonumber(L, -1);
        cout << "Result is " << fValue << endl;
    }

    // 栈的索引方式可以是正数也可以是负数，区别是：1永远表示栈底元素，-1永远表示栈顶元素。
    //至此，栈中的情况是：
    //=================== 栈顶 =================== 
    // 索引    类型      值
    // 5或-1   int       30 
    // 4或-2   int       20114442
    // 3或-3   string    shun 
    // 2或-4   table     tbl
    // 1或-5   string     I am so cool~
    //=================== 栈底 =================== 

    lua_pushstring(L, "Master");
    // 会将"Master"值出栈，保存值，找到到table的name键，如果键存在，存储到name键中
    lua_setfield(L, 2, "name");
    // 读取
    lua_getfield(L, 2, "name");
    str = lua_tostring(L, -1);
    cout << "tbl:name = " << str.c_str() << endl;

    // 创建新的table
    lua_newtable(L);
    lua_pushstring(L, "A New Girlfriend");
    lua_setfield(L, -2, "name");
    // 读取
    lua_getfield(L, -1, "name");
    str = lua_tostring(L, -1);
    cout << "newtbl:name = " << str.c_str() << endl;

    //7.关闭state
    // 销毁指定 Lua 状态机中的所有对象， 并且释放状态机中使用的所有动态内存。
    // （如果有垃圾收集相关的元方法的话，会调用它们）
    lua_close(L);

    getchar();
    return 0;
}
```

### 7.3、函数详解

1.读取lua全局变量

```cpp
lua_getglobal(L,"str);
```

实现过程：

* 把全局变量str里的值压入栈

* 由lua去寻找全局遍历str的值

* 如果找到了str的值就返回栈顶替换str

ps：如果存在相同命名的其他变量、table或者函数，就会报错



2.读取table中的键值

```cpp
lua_getglobal(L,"tb1);
lua_getfield(L,-1,"name");
```

实现过程：

* 把name压入栈

* 由lua去寻找table中name健的值

* 如果存在就返回至栈顶替换name

ps：这里的参数-1，就是表示把table中键值返回到栈顶





3.调用lua中的函数

```cpp
lua_getglobal(L, "add");        // 获取函数，压入栈中
lua_pushnumber(L, 10);            // 压入第一个参数
lua_pushnumber(L, 20);            // 压入第二个参数
// 栈过程：参数出栈->保存参数->参数出栈->保存参数->函数出栈->调用函数->返回结果入栈
// 调用函数，调用完成以后，会将返回值压入栈中，2表示参数个数，1表示返回结果个数，
// iRet为0表示调用成功
int iRet = lua_pcall(L, 2, 1, 0);
```







## 8、Lua调用C++

1. 将C++的函数包装成Lua环境认可的Lua_CFunction格式
2. 将包装好的函数注册到Lua环境中 
3. 像使用普通Lua函数那样使用注册函数

### 8.1、初始化 Lua 环境

```cpp
lua_State* L = luaL_newstate(); // 创建 Lua 状态对象
luaL_openlibs(L); // 打开 Lua 标准库
```

### 8.2、定义和包装 C++ 函数：

add.cpp

```cpp
int add(int a, int b) {
    return a + b;
}
```

要在 Lua 中调用它，需要将其包装成 Lua_CFunction 格式：

```cpp
static int lua_add(lua_State* L) {
    int a = lua_tointeger(L, 1); // 从栈中获取第一个参数
    int b = lua_tointeger(L, 2); // 从栈中获取第二个参数
    int sum = add(a, b); // 调用 C++ 函数
    lua_pushinteger(L, sum); // 将返回值压入 Lua 栈
    return 1; // 返回返回值的数量
}

```

### 8.3、注册C++函数到Lua

使用 `lua_register` 函数将包装好的函数注册到 Lua 环境中：

```cpp
lua_register(L, "add", lua_add);

```

### 8.4、设置全局变量和表

设置全局变量

```cpp
lua_pushinteger(L, 18);   // 将整数 18 入栈
lua_setglobal(L, "age");  // 将栈顶的值赋给 Lua 中的全局变量 age
```

创建并设置表

```cpp
lua_newtable(L); // 创建一张空表，并将其压栈
lua_pushstring(L, "lili"); // 将字符串 "lili" 入栈
lua_setfield(L, -2, "name"); // 设置表的 name 键为 "lili"
lua_setglobal(L, "newTable"); // 将栈顶的表设置为 Lua 中的全局变量 newTable
```

调用lua脚本

```cpp
luaL_dofile(L, "avg.lua"); // 加载并执行 Lua 脚本 avg.lua
```

## 9、Lua 与 C++ 交互

Lua与C++的交互涉及将C++函数包装为Lua可识别的格式，注册到Lua环境中，以及在Lua脚本中调用这些函数

### 9.1、封装C++函数为Lua模块

封装C++函数包装成Lua_CFunction格式

```cpp
// 示例：计算平均值和总和的函数
static int average(lua_State *L) {
    int n = lua_gettop(L); // 获取参数个数
    double sum = 0;

    // 遍历参数，计算总和
    for (int i = 1; i <= n; ++i) {
        sum += lua_tonumber(L, i); // 从栈中获取参数并累加
    }

    // 压入返回值：平均值和总和
    lua_pushnumber(L, sum / n); // 压入平均值
    lua_pushnumber(L, sum);     // 压入总和
    return 2; // 返回压入栈中的返回值数量
}

```

使用 luaL_newlib 将函数放入 Lua 表中

```cpp
// 将所有函数放到一个 table 中，并压入栈中
static const luaL_Reg mylibs_funcs[] = {
    {"average", average},
    {NULL, NULL} // 表的结束标志
};

// 创建 Lua 模块，将函数注册到模块中
int lua_openmylib(lua_State *L) {
    luaL_newlib(L, mylibs_funcs); // 创建新的 Lua 表，并注册函数
    return 1; // 将新表压入栈中
}

```

注册自定义模块到 Lua 环境中

```cpp
// 注册自定义模块到 Lua 环境中
static const luaL_Reg lua_reg_libs[] = {
    {"base", luaopen_base}, // Lua 标准库
    {"mylib", lua_openmylib}, // 自定义模块名为 mylib
    {NULL, NULL} // 结束标志
};

```

### 9.2在Lua函数中调用C++函数

avg.lua

```cpp
-- 使用自定义模块 mylib 调用 average 函数
avg, sum = mylib.average(10, 20, 30, 40, 50)
print("The average is ", avg)
print("The sum is ", sum)

```

