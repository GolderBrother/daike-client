/*
 * @Author: james.zhang 
 * @Date: 2018-09-11 17:31:40 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-17 16:49:48
 * @Description: course store 
 */

const state = {
  tabs: [{
      title: "我发布的",
      type: "publish"
    },
    {
      title: "我代课的",
      type: "substitute"
    },
    {
      title: "我收藏的",
      type: "collect"
    }
  ],
  course:{}
}

const getters = {
    tabs: state => state.tabs,
    course: state => state.course
}

const actions = {
  courseUpdate({commit},data){
    commit("COURSE_UPDATE",data)
  },
  courseClear({commit}){
    commit("COURSE_CLEAR")
  }
}

const mutations = {
  COURSE_UPDATE:(state,data) => {
    state.course = data;
  },
  COURSE_CLEAR:state => {
    state.course = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
