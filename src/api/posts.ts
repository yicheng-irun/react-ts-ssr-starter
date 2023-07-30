import { AxiosInstance } from "axios";


export interface PostsItem {
    id: number;
    time: string;
    title: string;
    keywords: string[];
    description: string;
    content: string;
    author: string;
}

/**
 * 文章列表
 * @param axios 
 * @returns 
 */
export async function apiGetPosts(axios: AxiosInstance) {
    const rsp = await axios.get<{
        success: boolean,
        message: string;
        data: PostsItem[]
    }>('/api/posts/list')

    if (rsp.data.success) {
        return rsp.data.data;
    }
    throw new Error('请求文章列表数据失败')
}

/**
 * 文章详情
 * @param axios 
 * @returns 
 */
export async function apiGetPostsDetail(axios: AxiosInstance, {id}: {
    id: string
}) {
    const rsp = await axios.get<{
        success: boolean,
        message: string;
        data: PostsItem
    }>('/api/posts/detail', {
        params: {
            id,
        }
    })

    if (rsp.data.success) {
        return rsp.data.data;
    }
    throw new Error('请求文章列表数据失败')
}