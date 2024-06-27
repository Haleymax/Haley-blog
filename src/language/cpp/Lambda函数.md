---
icon: pen-to-square
date: 2024-06-12
category:
  - C++
tag:
  - C++
  - 新特征

sticky: true
# 此页面会出现在星标文章中

order: 1
# 设置作者
author: Ms.Huang

---

# Lambda函数

## 1.匿名函数的基本语法

```cpp
[捕获列表](参数列表) mutable(可选) 异常属性 -> 返回类型{
    //函数体
}
```

eg：

```cpp
#include <iostream>

using namespace std;

void test01(){
    cout << "test01" << endl;
    
    //lanbda表达式
	auto Add = [](int a , int b) -> int{
        return a+b;
    }
    cout << Add(1,2) << endl;
}
```

一般情况下，编译器可以自动推断出lambda表达式的返回类型，所以我们可以不指定返回类型

```cpp
auto Add = [](int a, int b){
		return a + b;
	};
```

## 2.捕获列表

有时候，需要在匿名函数内使用外部变量，所以用捕获列表来传递参数。根据传递参数的行为，捕获列表可以分为以下几种:

### 2.1、值捕获

与参数传值类似，值捕获的前提是变量可以拷贝，不同之处则在于，**被捕获的变量在 lambda表达式被创建时拷贝**，而不是在调用时才拷贝

```cpp
// lambda_test lambda_test.cc
#include <iostream>

using namespace std;

void test03()
{
	cout << "test03" << endl;
	int c = 20;
	int d = 30;
	auto Add = [c,d](int a, int b) {
		cout << "d = "<< d << endl;
		return c;
	};

	d = 10; // 在这里修改 d 的值，会改变 Add里的 d 值吗？

	cout << Add(1, 2) << endl;
}


int main(int argc,char **argv)
{

	//test01();
	//test02();
	
	test03();
	
	return 0;
}

```

**ps** : 在lambda表达式创建后修改的变量值不会影响前面声明lambda时捕获的变量的值

### 2.2、引用捕获

与引用传参类似，引用捕获保存的是引用，值会发生变化

```CPP
#include <iostream>

using namespace std;
void test04()
{
	cout << "test04" << endl;
	int c = 20;
	int d = 30;
	auto Add = [c, &d](int a, int b) {
		cout << "c = " << c << endl;
		cout << "d = " << d << endl;
		return c;
	};

	d = 10;//在这里修改d的值，会改变Add里的d值吗？

	cout << Add(1, 2) << endl;
}


int main(int argc,char **argv)
{

	//test01();
	//test02();
	//test03();
	test04();

	return 0;
}

```

**输出结果：**

```shell
"E:\data structure\study\cmake-build-debug\1_3.exe"
test04
c = 20
d = 10
20
```

**ps :**如果采用引用捕获的话，那么引用捕获的是该变量的地址，如果后续该变量发生改变那么这个地址上对应的值也会发生变化

### 2.3、隐式捕获

手动书写捕获列表有时候是非常复杂的，这种机械性的工作可以交给编译器来处理，这时候可以在捕获列表中写一个 **& 或 =** 向编译器声明采用**引用捕获或者值捕获**。编译器会将外部变量全部捕获。

**案例：**

```cpp
//
// Created by huang on 2024/6/23.
//


#include "iostream"

using namespace std;

void test05(){
    cout << "test05" << endl;

    int c = 20;
    int d = 30;

    auto Add = [&](int a , int b){
        cout << "c = " << c << endl;
        cout << "d = " << d << endl;
        return c;
    };

    d = 10;  //前面的隐式捕获应该是获取到了d到引用捕获这里对d的修改会影响到后续的匿名函数调用

    cout << Add(1,2) << endl;
}

void test06(){
    cout << "test06" << endl;
    int c = 20;
    int d = 30;

    auto Add = [=](int a , int b){
        cout << "c = " << c << endl;
        cout << "d = " << d << endl;
        return c;
    };


    d = 10; //这里采用的是值捕获，修改这里的值并不会影响到匿名函数调用的结果，因为值捕获的时候就已经将变量的值捕获了
    cout << Add(1,2) << endl;
}


int main(){
    test05();
    test06();
}
```

**输出结果：**

```cpp
"E:\data structure\study\cmake-build-debug\1_4.exe"
test05
c = 20
d = 10
20
test06
c = 20
d = 30
20
```

### 2.4、空捕获列表

捕获列表’[]'中为空，表示Lambda不能使用所在函数中的变量。

**案例：**

```cpp
void test07()
{
	cout << "test07" << endl;
	int c = 20;
	int d = 30;
	auto Add = [](int a, int b) {
		cout << "c = " << c << endl; // 编译报错
		cout << "d = " << d << endl; // 编译报错
		return c;					 // 编译报错
	};

	d = 10;

	cout << Add(1, 2) << endl;
}
```

**运行结果：**

```shell
"D:\Program Files\JetBrains\CLion 2023.2\bin\mingw\bin\g++.exe"   -g -fdiagnostics-color=always -MD -MT CMakeFiles/1_4.dir/lanbda/1_4.cpp.obj -MF CMakeFiles\1_4.dir\lanbda\1_4.cpp.obj.d -o CMakeFiles/1_4.dir/lanbda/1_4.cpp.obj -c "E:/data structure/study/lanbda/1_4.cpp"
E:/data structure/study/lanbda/1_4.cpp: In lambda function:
E:/data structure/study/lanbda/1_4.cpp:49:27: error: 'c' is not captured
   49 |         cout << "c = " << c << endl; // 编译报错
      |                           ^
E:/data structure/study/lanbda/1_4.cpp:48:17: note: the lambda has no capture-default
   48 |     auto Add = [](int a, int b) {
      |                 ^
E:/data structure/study/lanbda/1_4.cpp:46:9: note: 'int c' declared here
   46 |     int c = 20;
      |         ^
E:/data structure/study/lanbda/1_4.cpp:50:27: error: 'd' is not captured
   50 |         cout << "d = " << d << endl; // 编译报错
      |                           ^
E:/data structure/study/lanbda/1_4.cpp:48:17: note: the lambda has no capture-default
   48 |     auto Add = [](int a, int b) {
      |                 ^
E:/data structure/study/lanbda/1_4.cpp:47:9: note: 'int d' declared here
   47 |     int d = 30;
      |         ^
E:/data structure/study/lanbda/1_4.cpp:51:16: error: 'c' is not captured
   51 |         return c;                                        // 编译报错
      |                ^
E:/data structure/study/lanbda/1_4.cpp:48:17: note: the lambda has no capture-default
   48 |     auto Add = [](int a, int b) {
      |                 ^
E:/data structure/study/lanbda/1_4.cpp:46:9: note: 'int c' declared here
   46 |     int c = 20;
```

**ps：**运行错误，在lanmbda表达式中无法识别出这几个变量，所以空引用无法调用原函数中的变量

### 2.5、表达式捕获

上面提到的值捕获、引用捕获都是已经在外层作用域声明的变量，因此这些捕获方式捕获的均为左值，而不能捕获右值。

C++14之后支持捕获右值，允许捕获的成员用任意的表达式进行初始化，被声明的捕获变量类型会根据表达式进行判断，判断方式与使用 auto 本质上是相同的：
**示例：**

```cpp
//
// Created by huang on 2024/6/23.
//


#include "iostream"
#include "memory"

using namespace std;

void test08(){
    cout << "test08" << endl;

    auto important = make_unique<int>(1);   //智能指针，智能指针能够自动管理声明周期实现对指针的构造和析构释放指针
    auto Add = [v1 = 1 , v2 = move(important)](int a , int b)->int{
        return a + b + v1 +(*v2);
    };

    cout << Add(1,2) << endl;
}

int main(){
    test08();
}
```

**运行结果：**

```cpp
"E:\data structure\study\cmake-build-debug\1_5.exe"
test08
5
```

### 2.6、泛型 Lambda

在C++14之前，lambda表示的形参只能指定具体的类型，没法泛型化。从 C++14 开始， Lambda 函数的形式参数可以使用 auto关键字来产生意义上的泛型。
简单点说，就是通过auto使lambda自适应参数类型：

**使用案例：**

```cpp
#include "iostream"

using namespace std;

void test09(){
    cout << "test09" << endl;
    auto Add = [](auto a , auto b){
        return a + b;  //使用auto实现泛型编程，编译器可以自己识别出变量类型并做相应的处理
    };

    cout << Add(1,2) << endl;
    cout << Add(1.1 , 1.2) << endl;
}

int main(int argc , char **argv){
    test09();
    return 0;
}
```

运行结果：

```shell
"E:\data structure\study\cmake-build-debug\1_6.exe"
test09
3
2.3
```

**PS:**C++的auto可以自动识别变量的类型，可以通过这个实现函数的泛型编程

### 2.7、可变lambda

（1）采用值捕获的方式，lambda不能修改其值，如果想要修改，使用mutable修饰。
（2）采用引用捕获的方式，lambda可以直接修改其值。

**示例：**

```cpp
#include "iostream"

using namespace std;

void test10(){
    cout << "test10" << endl;

    int v =10;

    //值捕获方式，使用mutable修饰，可以改变捕获的变量数
    auto tes = [v]() mutable {
        return ++v;
    };

    v = 5;
    auto a = tes();   //这里捕获的是匿名函数声明之前的变量
    cout << a << endl;
}

void test11(){
    cout << "test11" << endl;
    int v = 10;
    auto Add = [&v]{
        return v++;
    };

    v = 6;

    cout << Add() << endl;
    cout << v << endl;
}

int main(){
    test10();
    test11();
}
```

**运行结果：**

```shell
"E:\data structure\study\cmake-build-debug\1_7.exe"
test10
11
test11
6
7
```

**ps:**使用mutable可以改变捕获变量的值，但也只能是修改捕获之前的值，捕获之后的值并不会影响



### 2.8、混合捕获

1. 要求捕获列表中第一个元素必须是隐式捕获（&或=）。
2. 混合使用时，若隐式捕获采用引用捕获（&）则显式捕获的变量必须采用值捕获的方式。
3. 若隐式捕获采用值捕获（=），则显式捕获的变量必须采用引用捕获的方式。

**案例：**

```C++
#include "iostream"

using namespace std;

void test12(){
    cout << "test12" << endl;

    int c = 12;
    int d = 30;
    int e = 30;

    auto Add = [= , &c](int a , int b)->int {
        c = a;
        cout << "d = " << d << ", e = " << e << endl;
        return c;
    };

    d = 20;
    cout << Add(1,2) << endl;
    cout << "c : " << c << endl;
}

int main(int argc ,char **argv){
    test12();
}
```

**运行结果：**

```SHEL
"E:\data structure\study\cmake-build-debug\1_8.exe"
test12
d = 30, e = 30
1
c : 1
```

**PS:**可以进行直接值捕获，对c进行引用捕获，这样就可以将C的值修改，而不影响其他直接值捕获的数据



### 2.9、Lambda捕获列表总结

|        捕获         |                             含义                             |
| :-----------------: | :----------------------------------------------------------: |
|         []          |          空捕获列表，Lambda不能使用所在函数中的变量          |
|       [names]       | names是一个逗号分隔的名字列表，这些名字都是Lambda所在函数的局部变量。默认情况下，这些变量会被拷贝，然后按值传递，名字前面如果使用了&则按引用传递 |
|         [&]         |    隐式捕获列表，Lambda体内使用的局部变量都按引用方式传递    |
|         [=]         |       隐式捕获列表，Lambda体内使用的局部变量都按值传递       |
| [&,identifier_list] | identifier_list是一个逗号分隔的列表，包含0个或多个来自所在函数的变量，这些变量采用值捕获的方式，其他变量则被隐式捕获，采用引用方式传递，identifier_list中的名字前面不能使用&。 |
| [=,identifier_list] | identifier_list中的变量采用引用方式捕获，而被隐式捕获的变量都采用按值传递的方式捕获。identifier_list中的名字不能包含this，且这些名字面前必须使用& |


