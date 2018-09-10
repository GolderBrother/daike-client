// import Vue from 'vue'
import router from './index'
import store from '@/store'
router.beforeEach((to,from,next) => {
    const user = store.state.mine.user.account;
    if(user){
        next()
    }else{
        console.log("您还未登陆，请前往登录")
        next()
    }
})
export default router;