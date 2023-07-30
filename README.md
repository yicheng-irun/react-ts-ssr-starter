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


