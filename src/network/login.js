import { request } from './request'

export function getLogin(mobile, code) {
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

