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
 * 发表文章（新建）
 * @param {*} data draft: 是否存为草稿（true 为草稿）
 * @param {*} params 
 */
export function addArticle(data, draft = false) {
  return request({
    method: 'post',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}

