---
icon: pen-to-square
date: 2024-07-26
category:
  - C++
tag:
  - C++
  - MySql

sticky: true
# 此页面会出现在星标文章中

order: 1
# 设置作者
author: Ms.Huang

---

C/C++ 使用 MySQL API 操作 数据库

## 1、连接数据库操作的步骤实现

1. 初始化链接
  
2. 连接mysql服务器，参数如下：
  

* 服务器的IP
  
* 端口
  
* 用户名
  
* 密码
  
* 数据库名
  

3. 对数据进行增删查改
  
4. 事务处理
  
5. 数据库的读数据 操作-> 查询 -> 得到结果集
  
6. 遍历结果集 -> 获得自己需要的数据
  
7. 释放资源
  

## 2、API详解

### 2.1、初始化连接

**函数:**`MYSQL *mysql_init(MYSQL *mysql);`

**返回值:** 该函数将分配、初始化、并返回新对象通过返回的这个对象去连接MySQL的服务器

### 2.2、连接mysql服务器

**函数及参数：**

    MYSQL *mysql_real_connect(
            MYSQL *mysql,               //mysql_init() 函数的返回地址
            const char *host,           //主机地址
            const char *user,           //mysql服务器的用户名
            const char *passwd,         //连接mysql服务器的密码
            const char *db,             //需要连接的数据库名字
            unsigned int port,          //连接的端口，mysql服务器默认为3306
            const char *unix_socket,    //本地套接字,如果没有指定就是NULL
            unsigned long client_flag   //通常指定为0
        )

**返回值：** 成功: 返回MYSQL*连接句柄（所谓的句柄就是一个连接的对象）, 对于成功的连接，返回值与第1个参数的值相同。返回值指向的 内存和第一个参数指针指向的内存一样 失败，返回NULL。

**句柄:** 是windows中的一个概念, 句柄可以理解为一个实例(或者对象)

### 2.3、执行sql语句

**函数：** `int mysql_query(MYSQL *mysql , const char *query);`

**参数：**

* mysql ： mysql_real_connect()的返回值
  
* query ：一个可以执行的sql语句，结尾的位置不需要加 ;
  

**返回值：**

* 查询成功：返回0，如果是查询，结果集放在mysql对象中
  
* 查询失败：返回非0值
  

### 2.4、获取结果集

**函数：** `MYSQL_RES *mysql_store_result(MYSQL *mysql);`

**返回值：**

* 将结果集从mysql对象这个参数中取出
  
* MYSQL_RES 对应的一块内存，里边保存着这个查询之后得到的结果集
  
* 返回值是具有多个MYSQL_RES结果集合，如果出现错误，返回NULL
  

### 2.5、结果集列数

**函数：** `unsigned int mysql_num_fields(MYSQL_RES *result);`

**作用：** 获取结果集中的列数

**参数：** 调用mysql_store_result()得到的返回值

**返回值：** 结果集中的列数

### 2.6、从结果集中获取到表中的字段名

**函数：** `MYSQL_FIELD *mysql_fetch_fields(MYSQL_RES *result);`

**参数：** 调用mysql_store_result()得到的返回值

**返回值：** MYSQL_FIELD * 指向一个结构体

**作用：** 通过这个函数得到结果集中所有列的名字

**MYSQL_FIELD结构体：**

    // mysql.h
    // 结果集中的每一个列对应一个 MYSQL_FIELD
    typedef struct st_mysql_field {
      char *name;                 /* 列名-> 字段的名字 */
      char *org_name;             /* Original column name, if an alias */
      char *table;                /* Table of column if column was a field */
      char *org_table;            /* Org table name, if table was an alias */
      char *db;                   /* Database for table */
      char *catalog;              /* Catalog for table */
      char *def;                  /* Default value (set by mysql_list_fields) */
      unsigned long length;       /* Width of column (create length) */
      unsigned long max_length;   /* Max width for selected set */
      unsigned int name_length;
      unsigned int org_name_length;                                                                                        
      unsigned int table_length;
      unsigned int org_table_length;
      unsigned int db_length;
      unsigned int catalog_length;
      unsigned int def_length;
      unsigned int flags;         /* Div flags */
      unsigned int decimals;      /* Number of decimals in field */
      unsigned int charsetnr;     /* Character set */
      enum enum_field_types type; /* Type of field. See mysql_com.h for types */
      void *extension;
    } MYSQL_FIELD;

### 2.7、得到结果集中字段的长度

**函数：** result 通过查询得到的结果集

**返回值：** 无符号长整数的数组表示各列的大小。如果