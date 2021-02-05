import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({

    baseURL: 'http://api-toutiao-web.itheima.net',

    timeout: 5000,
    headers: { 'Content-Type': '	application/json' },

    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      try {
        return JSONbig.parse(data)
      } catch {
        return data;
      }

    }],

  })

  // instance.defaults.withCredentials = true;

  // 2. axios的拦截器
  // 2.1 请求拦截的作用


  instance.interceptors.request.use(config => {

    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的

    // 通过axios请求拦截器添加token,保证拥有获取数据的权限
    // 为请求头对象,添加token验证的Authorization字段
    const user = JSON.parse(window.sessionStorage.getItem('user'))


    // 如果有用户信息，则统一设置
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
      // config.headers.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE1NTA4NjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.rVid35SUxCDD6IETW9UoSwserSob6bBMr4k1XyGilYg'
    }
    // 当这里 return config 之后请求才会真正的发出去
    return config
  }, err => {

  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
    console.dir(err)
    const { status } = err.response
    if (status === 401) {
      // 将本地存储的user清除
      window.sessionStorage.removeItem('user')
      跳转到登录页面
      router.push('/login')
      Message.error('登录状态无效，请重新登录！')
    } else if (status === 400) {
      Message.error('参数错误，请检查请求参数！')
    } else if (status === 403) {
      Message.warning('没有操作权限！')
    } else if (status >= 500) {
      Message.error('服务器内部异常，请稍后重试！')
    }
    return Promise.reject(err);
  })

  // 3. 发送真正的网络请求
  return instance(config)
}

