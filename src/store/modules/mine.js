/*
 * @Author: james.zhang  
 * @Date: 2018-09-10 15:26:22
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-11 17:50:07
 * @Description: mine store 
 */
import { Session } from '@/utils/storage';
import defaultHeader from "@/assets/images/default_header.png";
import userAvatar from "@/assets/images/avatar.jpg";
const state = {
  user: {
    name:Session.get("user") || "",
    avatar:Session.get("avatar") || defaultHeader 
  }
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  setUserInfo({ commit }, data) {
    commit.commit('SET_USER', data);
  },
  exit({commit}){
    commit("EXIT")
  }
}

// mutations
const mutations = {
  // 设置用户信息
  SET_USER: (state, data) => {
    const { account:username } = data;
    state.user = data;
    state.user["avatar"] = userAvatar
    Session.set('user',username)
    Session.set('avatar',userAvatar)
  },
  EXIT:(state,data) => {
    state.user = {};
    Session.remove(["user","avatar"]);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}