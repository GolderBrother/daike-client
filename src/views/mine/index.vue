<template>
  <div class="container">
    <van-popup class="eidt-popup" v-model="isShowEdit" position="right" :overlay="false">
      <edit-info @toggleEditPopup="onToggleEditPopup"></edit-info>
    </van-popup>

    <van-row type="flex" align="center">
      <van-col span="4">
        <img class="header-img" :src="user.avatar || defaultHeader" alt="">
      </van-col>
      <van-col span="10" offset="2" class="username">
        {{user.userName}}
      </van-col>

      <van-col span="8" offset="2">
        <van-button class="btn-edit" size="mini" @click="onToggleEditPopup(true)">编辑个人资料</van-button>
        <van-button class="btn-logout" size="mini" @click="goLogin()">{{ user.userName ? '退出登录' : '前往登录'}}</van-button>
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        学号：
      </van-col>
      <van-col span="10" offset="2">
        {{user.studentId}}
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        学校：
      </van-col>
      <van-col span="10" offset="2">
        {{user.school}}
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        学院：
      </van-col>
      <van-col span="18" offset="2">
        {{user.college}}
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        专业：
      </van-col>
      <van-col span="10" offset="2">
        {{user.major}}
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        电话：
      </van-col>
      <van-col span="10" offset="2">
        {{user.phone | mixAsterisk}}
      </van-col>
    </van-row>

    <van-row class="row" type="flex" align="center">
      <van-col span="4">
        email：
      </van-col>
      <van-col span="10" offset="2">
        {{user.email}}
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditInfo from '@/components/EditInfo'
import defaultHeader from '@/assets/images/default_header.png'
export default {
  components: {
    EditInfo
  },
  data() {
    return {
      defaultHeader,
      isShowEdit: false
    };
  },
  methods: {
    onToggleEditPopup(flag) {
      const { userName } = this.user;
      console.log(this.user)
      if(userName){
        this.isShowEdit = flag;
      }else{
        this.$toast('请先登录')
      }
    },
    goLogin(){
      const { userName } = this.user;
      if(userName){
        this.$store.dispatch("exit");
      }
      this.$router.push("/login")
    },
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  filters: {
    mixAsterisk(phone) {
      if (!phone) return '';
      const arr = phone.split('');
      arr.splice(3, 4, '****');
      return arr.join('');
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  /deep/ .van-col--4 {
    text-align: right;
  }

  .eidt-popup {
    width: 100%;
    height: 100%;
  }
}
.header-img {
  width: 100%;
  border-radius: 50%;
}

.username {
  font-size: 26px;
}

.row {
  margin: 10px 0;
}
.btn-edit ,.btn-logout{
  width: 100px;
  margin: 5px 0;
}
.btn-logout{
  color: #fff;
  background: red;
}
</style>

