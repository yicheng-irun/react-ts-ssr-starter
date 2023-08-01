import { useEffect, useState } from "react"
import { PostsItem, apiGetPostsDetail } from "../../../api/posts"
import { styled } from "styled-components"
import { ArticleDetail } from "./article-detail"
import axios from "axios"
import { LoaderFunction, useSearchParams } from "react-router-dom"

const StyledDiv = styled.div`
  

`

export default function Page() {

  const [articleData, setArticleData] = useState<PostsItem| null | undefined>(undefined)

  const [params] = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    if (!id) return;
    (async () => {
      const rsp = await apiGetPostsDetail(axios, { id })
      setArticleData(rsp);
    })().catch(console.error);
  }, []);

  return <StyledDiv>
    {
      !!articleData && <ArticleDetail article={articleData}></ArticleDetail>
    }
    {
      articleData === null && <h3>文章不存在</h3>
    }
    {
      articleData === undefined && <h3>文章加载中</h3>
    }
  </StyledDiv>
}


/**
 * @param param0 
 * @returns 
 */
export const loader: LoaderFunction = ({ request, params }) => {
  console.log('posts page loader func run')
  console.log(request.url, params)


  return {
    data: 'loader中的数据'
  }
}