import { request } from '@/network/request.js'

/**
 * 获取评论列表
 * @param {*} params 
 */
export const getCommentList = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}

/**
 * 修改文章评论状态
 * @param {*} articleId 
 * @param {*} data 
 */
export const editCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}