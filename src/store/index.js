/*
 * @Author: james.zhang 
 * @Date: 2018-09-10 15:38:14 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2018-09-10 15:38:34
 * @Description: vuex store 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mine from './modules/mine'
import publish from './modules/publish'

import about from './modules/about'
import home from './modules/home'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        about,
        home,
        mine,
        publish
    },
    strict: process.env.NODE_ENV !== 'production'
})
export default store