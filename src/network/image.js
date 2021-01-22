import { request } from '@/network/request.js'

/**
 * 上传用户图片素材
 * @param {*} data 
 */
export const uploadImage = data => {
  return request({
    method: 'post',
    url: '/mp/v1_0/user/images',
    data
  })
}