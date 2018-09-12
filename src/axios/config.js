/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:39:27 
 * @Last Modified by:  james.zhang 
 * @Last Modified time: 2018-09-12 11:39:27 
 * @Description: axios 默认的配置 
 */

export default {
    method: 'post',
    // 基础url前缀
    baseURL: 'http://localhost:3000',
    // 请求头信息
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证 允许携带cookie 后端需要配合 allow credentials
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}