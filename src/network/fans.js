import { request } from './request'

export function getFansList() {
  return request({
    method: 'GET',
    url: '/app/v1_0/followers',


  })
}