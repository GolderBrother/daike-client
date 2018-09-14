/*
 * @Author: james.zhang 
 * @Date: 2018-09-10 16:32:10 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-12 16:04:30
 * @Description: home store 
 */
import { Session } from '@/utils/storage'
const state = {
    footerBarList:[
        {title:'代课',icon:'shop',path:'/home/substitute'},
        {title:'发布',icon:'edit',path:'/home/publish'},
        {title:'课程',icon:'records',path:'/home/course'},
        {title:`${Session.get("userName") ? '我的' : '未登录'}`,icon:'contact',path:'/home/mine'}
    ]
}

// getters
const getters = {
    footerBarList:state => state.footerBarList
}

// actions
const actions = {

}

// mutations
const mutations = {
    
}

export default {
    state,
    getters,
    actions,
    mutations
}