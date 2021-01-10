import { request } from './request'

//获取文章频道
export function getArticleChannels() {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}

//获取文章列表（适用内容管理、评论管理、图文数据）
export function getArticleList(params) {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data设置
    // Query 参数使用 params 设置
    // Headers 参数使用 Headers 设置
    params
  })
}

/**
 * 删除文章
 */
export function deleteArticleById(articleId) {
  return request({
    method: 'delete',
    // url: `app/v1_0/articles/articleId`
    url: `app/v1_0/articles/${articleId}`,
  })
}