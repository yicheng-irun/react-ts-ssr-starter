import { useEffect, useState } from "react"
import axios from 'axios'
import { PostsItem, apiGetPosts } from "../../api/posts";
import ArticleList from "./article-list";
import styled from 'styled-components'

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