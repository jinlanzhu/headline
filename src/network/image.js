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

/**
 * 获取用户图片素材
 * @param {*} params 
 */
export const getImagesList = params => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params
  })
}

/**
 * 收藏图片素材
 * @param {*} imageId  收藏的图片 id
 * @param {*} params   是否收藏，false-取消收藏，true-添加收藏
 */
export const addCollectImages = (imageId, collect) => {
  return request({
    method: 'put',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

/**
 * 删除图片素材
 * @param {*} imageId 
 */
export const deleteImage = (imageId) => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/user/images/${imageId}`,
  })
}