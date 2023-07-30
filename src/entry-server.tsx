import express from "express";
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { RenderResult } from '../server/ssr-utils'
import { createRouter } from "./create-router";
import ReactDOMServer from 'react-dom/server'
import App from "./App";
import { createFetchRequest } from "./plugins/fetch-request";

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
}): Promise<RenderResult['renderData']> {
  // 创建路由
  let router = createStaticRouter(
    routerHandler.dataRoutes,
    context
  );

  // 进行渲染
  let html = ReactDOMServer.renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>
  );

  const content = template.replace('<!--app-html-->', html);

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
  let fetchRequest = createFetchRequest(param.req);
  let context = await routerHandler.query(fetchRequest);

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