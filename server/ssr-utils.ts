import { Request, RequestHandler, Response } from "express";
import { ViteDevServer } from "vite";
import { readFileSync } from 'fs';
import { resolve } from 'path';


export type RenderResult = {
    /**
     * 重定向模式下
     */
    redirect?: {
        url: string | null;
        statusCode: number
    }
    /**
     * 直接返回的模式
     */
    renderData?: {
        content: string;
        statusCode: number;
    };
}

async function renderPage(req: Request, res: Response, vite?: ViteDevServer): Promise<RenderResult> {
    try {
        let template = '';
        let render: (param: {
            req: Request;
            res: Response;
            template: string;
        }) => Promise<RenderResult>;

        if (vite) {
            template = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
            template = await vite.transformIndexHtml(req.originalUrl, template);
            render = (await vite.ssrLoadModule(resolve(__dirname, '../src/entry-server'))).render;
        } else {
            throw new Error('生产环境未就绪')
        }

        const renderResult = await render({ req, res, template });

        return renderResult;
    } catch (error) {
        if (vite && error instanceof Error) {
            vite.ssrFixStacktrace(error);
        }
        throw error;
    }
}


export const ssrHander = (req: Request, res: Response, vite: ViteDevServer) => {
    (async () => {
        try {
            const result = await renderPage(
                req,
                res,
                vite,
            );

            // 处理重定向
            if (result.redirect) {
                res.redirect( result.redirect.statusCode, result.redirect.url || '');
                return;
            }

            // 当渲染了真实的数据
            if (result.renderData) {
                res.setHeader('Content-Type', 'text/html');
                res.status(result.renderData.statusCode || 200).end(result.renderData.content);
                return;
            }

            throw new Error('渲染异常')
        } catch (error) {
            console.error(error.stack);
            res.status(500).end(error.stack);
        }
    })();
}