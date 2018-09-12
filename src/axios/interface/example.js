/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:42:35 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-12 11:43:25
 * @Description: example api  
 */

import axios from './../api'

const getExample = params => {
  return axios({
    url: '/example/get',
    method: 'get',
    params
  })
}

const postExample = data => {
  return axios({
    url: '/example/post',
    method: 'post',
    data
  })
}

export default {
  getExample,
  postExample
}