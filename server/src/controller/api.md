# BLOG-API

注：url:http://127.0.0.1 get请求传递的参数默认在params，post传递的在body，特殊在接口中特殊标注

## 一、user

### 1、注册

#### （1）功能介绍

注册账号

#### （2）接口地址

```tsx
/api/user/register GET
```

#### （3）请求参数

```tsx
userName // /^[A-Za-z0-9]{4,12}$/  '4-12位由字母+数字的组合'
password // /^[A-Za-z0-9]{4,12}$/ '4-12位由字母+数字的组合'
```

#### （4）响应

```tsx
code 0-成功 1-失败
msg  
data 
```

### 2、登录

#### （1）功能介绍

登录账号

#### （2）接口地址

```tsx
/api/user/login POST
```

#### （3）请求参数

```tsx
userName // /^[A-Za-z0-9]{4,12}$/  '4-12位由字母+数字的组合'
password // /^[A-Za-z0-9]{4,12}$/ '4-12位由字母+数字的组合'
```

#### （4）响应

```tsx
code 0-成功 1-失败
msg  
data 
	token // string
```



