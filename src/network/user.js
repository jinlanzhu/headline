import { request } from './request'

/**
 * 获取用户个人资料
 */
export function getUserProfile() {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}