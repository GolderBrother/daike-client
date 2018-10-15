/*
 * @Author: james.zhang 
 * @Date: 2018-09-10 16:32:10 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-10-15 16:49:51
 * @Description: home store 
 */
import { Session } from '@/utils/storage'
const state = {
    footerBarList:[
        {title:'代课',icon:'shop',path:'/home/substitute'},
        {title:'发布',icon:'edit',path:'/home/publish'},
        {title:'课程',icon:'records',path:'/home/course'},
        {title:`${Session.get("account") ? '我的' : '未登录'}`,icon:'contact',path:'/home/mine'}
    ]
}

// getters
const getters = {
    footerBarList:state => state.footerBarList
}

// actions
const actions = {
    getLastTab({commit}){
        commit("GET_LAST_TAB")
    }
}

// mutations
const mutations = {
    // 获取最后一个 tab 名字
    GET_LAST_TAB:(state) => {
        let title = Session.get("account") ? '我的' : '未登录';
        state.footerBarList[state.footerBarList.length - 1].title = title
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}