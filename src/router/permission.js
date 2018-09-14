// import Vue from 'vue'
import router from './index'
import store from '@/store'
import {
  Toast
} from 'vant'
import {
  Session
} from '@/utils/storage';
// 路由拦截
router.beforeEach((to, from, next) => {
  const {
    name
  } = to;
  const {
    user
  } = store.state.mine;
  if (!user.userId || user.userId === "") {
    const userId = Session.get("userId");
    if (!userId || userId === "") {
      // 发布和课程需要登录传，才能查看
      if (name === "publish" || name === "course") {
        Toast.fail("您还未登陆，请前往登录");
        return;
      }
      next();
    } else {
      store.dispatch("getUserInfo");
      next();
    }
  } else {
    next()
  }

})
export default router;
