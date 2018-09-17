/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:43:59 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-17 18:03:19
 * @Description: publish api
 */

import axios from './../api'

const publishCourse = data => {
  return axios({
    url: '/publish',
    method: 'post',
    data
  })
}
const updateCourse = data => {
  return axios({
    url:'/course/update',
    method:'post',
    data
  })
}
export default {
  publishCourse,
  updateCourse
}