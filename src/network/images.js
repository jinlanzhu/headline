import { request } from './request'

/**
 * 获取用户图片素材
 * @param {*} params 
 */
export function getImagesList(params) {
  return request({
    method: 'get',
    url: '/app/v1_0/user/images',
    params
  })
}