/*
 * @Author: james.zhang  
 * @Date: 2018-09-10 15:26:22
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-17 16:31:32
 * @Description: mine store 
 */
import {
  Session
} from '@/utils/storage';
// import defaultHeader from "@/assets/images/default_header.png";
import userAvatar from "@/assets/images/avatar.jpg";
const state = {
  user: {
    // name:Session.get("user") || "",
    // avatar:Session.get("avatar") || defaultHeader
  }
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  getUserInfo({
    commit
  }) {
    commit('GET_USER');
  },
  setUserInfo({
    commit
  }, data) {
    commit('SET_USER', data);
  },
  exit({
    commit
  }) {
    commit("EXIT")
  }
}

// mutations
const mutations = {
  // 设置用户信息
  SET_USER: (state, data) => {
    // const { account:username } = data;
    state.user = data;
    state.user["avatar"] = userAvatar;
    Session.set(data);
    Session.set("avatar", userAvatar);
  },
  // vuex中的state,刷新后state就清空了,因此就把user存在sessionStorage中,后面再从session获取
  GET_USER: (state) => {
    const user = {
      qq: Session.get("qq"),
      avatar: Session.get("avatar"),
      userId: Session.get("userId"),
      userName: Session.get("userName"),
      studentId: Session.get("studentId"),
      school: Session.get("school"),
      schoolId: Session.get("schoolId"),
      college: Session.get("college"),
      major: Session.get("major"),
      phone: Session.get("phone"),
      email: Session.get("email"),
      wechat: Session.get("wechat")
    };
    state.user = user;
  },
  EXIT: (state, data) => {
    state.user = {};
    let userSession = [];
    for (let ss in window.sessionStorage) {
      userSession.push(ss)
    }
    Session.remove(userSession);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
