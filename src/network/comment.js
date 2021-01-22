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