/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 11:43:59 
 * @Last Modified by:  james.zhang 
 * @Last Modified time: 2018-09-12 11:43:59 
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

export default {
  publishCourse
}