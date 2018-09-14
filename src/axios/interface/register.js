/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:44:24 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-12 13:55:57
 * @Description: register api
 */


import axios from './../api';

const register = data => {
  return axios({
      url: '/register',
      method: 'post',
      data
  })
}

export default {
  register
}