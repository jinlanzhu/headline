import { request } from './request'

/**
 * 获取用户个人资料
 */
export function getUserProfile() {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
    // }
  })
}

/**
 * 编辑用户头像
 * @param {*} data 
 */
export function updateAvatar(data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

/**
 * 编辑用户资料
 * @param {*} data 
 */
export function updateProfileInfo(data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}