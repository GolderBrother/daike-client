<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item :to="menu.path" :icon="menu.icon" v-for="(menu,index) in footerBarList" :key="index">
              {{ menu.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
import { mapGetters } from 'vuex';
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 3
    };
  },
  created(){
    const { path } = this.$route;
    this.$store.dispatch("getLastTab");
    this.footerBarList.forEach((item,index) => {
      if(item.path === path){
        this.active = index;
      }
    })
  },
  computed: {
    ...mapGetters([
      'footerBarList'
    ])
  }
};
</script>
<style lang="scss" scoped>
</style>

