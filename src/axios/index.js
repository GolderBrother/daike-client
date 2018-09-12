/*
 * @Author: james.zhang 
 * @Date: 2018-09-12 09:56:36 
 * @Last Modified by:  james.zhang 
 * @Last Modified time: 2018-09-12 11:40:15 
 * @Description: 将 axios 封装成 Vue 的插件使用 
 */
 
import apiExample from './interface/example'
import apiLogin from './interface/login'
import apiRegister from './interface/register'
import apiChangePwd from './interface/changePwd'
import apiPublish from './interface/publish'
import apiSubstitute from './interface/substitute'
import apiMine from './interface/mine'

const install = Vue => {
    if (install.installed)
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                // PS: 这里没有区分命名空间
                return Object.assign(
                    {},
                    apiExample,
                    apiRegister, 
                    apiChangePwd,
                    apiLogin, 
                    apiPublish, 
                    apiSubstitute,
                    apiMine
                )
                // 如果需要区分命令空间的话可以参考以下写法
                // {
                //     apiLogin,
                //     apiRegister,
                //     apiPublish
                // }
            }
        }
    })
}

export default install