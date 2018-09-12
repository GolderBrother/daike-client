<template>
  <div>
    <router-view/>
    <van-tabbar v-model="active">
      <FooterBar />
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { mapGetters } from "vuex";
import FooterBar from '@/components/FooterBar'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    FooterBar
  },
  data() {
    return {
      msg: "Hello world -- home",
      active: 3
    };
  },
  computed: {
    ...mapGetters(["footerBarList"])
  }
};
</script>

<style lang="scss" scoped>
</style>

