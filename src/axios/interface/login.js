/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:43:05 
 * @Last Modified by:  james.zhang 
 * @Last Modified time: 2018-09-12 11:43:05 
 * @Description: login api  
 */
 
import axios from './../api'

const login = data => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export default {
  login
}