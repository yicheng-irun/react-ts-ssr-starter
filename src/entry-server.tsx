import express from "express";
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { RenderResult } from '../server/ssr-utils'
import { createRouter } from "./create-router";
import ReactDOMServer from 'react-dom/server'
import App from "./App";
import { createFetchRequest } from "./plugins/fetch-request";
import { ServerStyleSheet } from "styled-components";

const { routes } = createRouter();
const routerHandler = createStaticHandler(routes)

async function renderPage({
  context,
  template
}: {
  context: StaticHandlerContext,
  /**
   * index.html的模板
   */
  template: string;
}): Promise<NonNullable<RenderResult['renderData']>> {
  // 创建路由
  const router = createStaticRouter(
    routerHandler.dataRoutes,
    context
  );

  const sheet = new ServerStyleSheet();

  // 进行渲染
  const html = ReactDOMServer.renderToString(sheet.collectStyles(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>
  ));

  const content = template.replace('<!--app-html-->', html)
    .replace('<!--server-style-sheet--->', sheet.getStyleTags())


  return {
    content,
    statusCode: context.statusCode,
  }
}

/**
 * 服务端的渲染函数
 * @param param 
 * @returns 
 */
export async function render(param: {
  req: express.Request,
  res: express.Response,
  template: string;
}): Promise<RenderResult> {
  // 准备渲染的上下文
  const fetchRequest = createFetchRequest(param.req);
  console.log('create fetch request end');
  // 发起上下文的数据请求
  const context = await routerHandler.query(fetchRequest);
  console.log('context ready');

  /**
   * 如果触发了
   */
  if (context instanceof Response) {
    return {
      renderData: {
        statusCode: context.status,
        content: '',
      }
    }
  }

  const renderData = await renderPage({ context, template: param.template });
  return {
    renderData
  }
}