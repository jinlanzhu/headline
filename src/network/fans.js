import { request } from './request'

export function getFansList() {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',


  })
}