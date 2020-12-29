import axios from 'axios'


export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn',
    baseURL: 'http://rest.apizza.net/mock/027e324474700080d60b04c7c0126f57/',
    timeout: 5000,
  })

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
  })

  // 3. 发送真正的网络请求
  return instance(config)
}

