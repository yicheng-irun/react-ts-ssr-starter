import { useEffect, useState } from "react"
import axios from 'axios'
import { PostsItem, apiGetPosts } from "../../api/posts";
import ArticleList from "./article-list";
import styled from 'styled-components'
import { ActionFunction, LoaderFunction, json } from "react-router-dom";

const StyledDiv = styled.div`
>h2 {
  text-align: center;
}
`


export default function Page() {
  const [postsList, setPostsList] = useState<PostsItem[]>([]);

  useEffect(() => {
    (async () => {
      const rsp = await apiGetPosts(axios)
      setPostsList(rsp);
    })().catch(console.error);
  }, []);

  return <StyledDiv>
    <h2>
      文章列表页
    </h2>
    <ArticleList articles={postsList}></ArticleList>
  </StyledDiv>
}

/**
 * @param param0 
 * @returns 
 */
export const loader: LoaderFunction = ({ request, params }) => {
  console.log('posts page loader func run')
  console.log(request.url, params)


  return json({})
}


/**
 * action 函数仅在非get方式的请求中触发
 * Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route. 
 */
export const action: ActionFunction = () => {
  console.log('posts page action func run');

  return {
    ok: true,
  }
}