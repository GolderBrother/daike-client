/*
 * @Author: james.zhang 
 * @Date: 2018-09-11 17:31:40 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-11 17:50:43
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
}

const getters = {
    tabs: state => state.tabs
}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
