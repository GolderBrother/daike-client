/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:43:37 
 * @Last Modified by:  james.zhang 
 * @Last Modified time: 2018-09-12 11:43:37 
 * @Description: mine api
 */

import axios from './../api'

const searchSchoolByName = data => {
  return axios({
    url: '/school',
    method: 'post',
    data
  })
}

const updateUser = data => {
  return axios({
    url: '/update/user',
    method: 'post',
    data
  })
}

export default {
  searchSchoolByName,
  updateUser
}