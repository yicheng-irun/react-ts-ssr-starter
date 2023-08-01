# react-ts-ssr-starter
react+typescript+vitejs+SSR

使用的库
* styled-components 【样式】
* mobx 【数据状态管理和同步】



## 1. 使用vite初始化一个react+typescript项目
> 参考文档：https://cn.vitejs.dev/guide/

使用命令:
```bash
pnpm create vite
```
选择 React 和 TypeScript

## 2. 初始化server 目录

参考资料：
https://cn.vitejs.dev/guide/ssr.html

使用一个服务端的npm 库，如express，koa 等库，
1.完成api接口监听
2.实现对vitejs 的静态构建进行接管
3.准备适当的服务端mock 数据

## 3. 对前端页面进行初步的服务端渲染

参考资料：
https://reactrouter.com/en/main/guides/ssr
使用ReactDOMServer.renderToString 进行服务端的渲染。

## 4. 普通模式下的数据请求
在useEffect中进行数据请求 [ssr反例]

## 5. 在服务端进行数据请求
* 服务端的axios实例，cookie和header的处理
* 拆分客户端和服务端axios的实例
* 数据预请求函数

## 6. 服务端请求的数据，在前端进行接管，避免前端重复请求
* 数据传递和接管

## 7. css样式的直出，styled-components的样式的直出，避免页面样式闪动

相关资料：
https://styled-components.com/docs/advanced#server-side-rendering

## 8. title的直出，meta标签的直出

react-helmet-async

```jsx
<HelmetProvider context={helmetContext}></HelmetProvider>
```

```js
content = content.replace('<!--helmet-meta-->', helmetContext.helmet.meta.toString())
      .replace('<!--helmet-title-->', helmetContext.helmet.title.toString())
      .replace('<!--helmet-link-->', helmetContext.helmet.link.toString())
      .replace('<!--helmet-style-->', helmetContext.helmet.style.toString())
      .replace('<!--helmet-script-->', helmetContext.helmet.script.toString())
      .replace('-helmet-body-attrs-', helmetContext.helmet.bodyAttributes.toString());
```