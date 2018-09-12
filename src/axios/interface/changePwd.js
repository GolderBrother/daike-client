/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 09:51:03 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-12 09:54:18
 * @Description: change password
 */

import axios from '../api';

const changePwd = data => {
    return axios({
        url:'/changePassword',
        method:'post',
        data
    })
}

export default {
    changePwd
}
