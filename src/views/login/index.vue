<template>
  <div class="login-container">
    <img class="logo" src="@/assets/images/daike.png">

    <van-cell-group class="box">
      <van-field v-model="account" label-align="left" required clearable label="用户名" icon="question" placeholder="请输入用户名" @click-icon="handleQuestion" />

      <van-field v-model="password" label-align="left" type="password" clearable label="密码" placeholder="请输入密码" required @keyup.enter.native="handleLogin"/>

      <van-field v-show="!isLogin" v-model="rePassword" label-align="left" type="password" clearable label="重复密码" placeholder="请再次输入密码" required @keyup.enter.native="handleLogin" />
    </van-cell-group>
    <van-row class="forget-box">
      <van-col>
        <span @click="$router.push('/changePwd')">忘记密码?</span>
      </van-col>
    </van-row>
    <van-row>
      <van-button size="small" @click="handleRegister">
        {{isLogin ? '注 册' : '已有账号'}}
      </van-button>

      <van-button type="primary" class="btn-login" size="small" @click="handleLogin">
        {{isLogin ? '登 录' : '注册并登录'}}
      </van-button>
    </van-row>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      account: "",
      password: "",
      rePassword: "",
      isLogin: true
    };
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER"
    }),
    handleQuestion() {
      // no question
    },
    async login() {
      try {
        const { data } = await this.$http.login({
          account: this.account,
          password: this.password
        });
        this.$toast.clear();
        // this.$store.dispatch('setUserInfo',data)
        this.setUserInfo(data);
        // this.SET_USER(data);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        // this.$toast.clear();
        // this.$toast.fail( || error.message);
      }
    },
    showLoginTip() {
      const toast = this.$toast.loading({
        duration: 1000, // 持续展示 toast
        forbidClick: false, // 禁用背景点击
        loadingType: "spinner",
        message: "登录中..."
      });
    },
    handleRegister() {
      this.isLogin = !this.isLogin;
    },
    async handleLogin() {
      if (this.account == "" || this.password == "") {
        this.$toast.fail("用户名或密码不能为空！");
        return;
      }
      if (this.isLogin) {
        // 登录
        this.showLoginTip();
        await this.login();
      } else {
        try {
          // 注册
          if (this.rePassword != this.password) {
            this.$toast.fail("两次输入密码不一致！");
            return;
          }
          this.showLoginTip();
          const { data } = await this.$http.register({
            account: this.account,
            password: this.password
          });
          this.setUserInfo(data);
          this.$router.push("/home");
        } catch (error) {
          console.log(error);
        }
        this.$toast.clear();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo {
    width: 300px;
    margin: 100px 0 20px;
  }

  .box {
    width: 280px;
  }
  .forget-box {
    display: flex;
    width: 280px;
    margin: 10px 0;
    justify-content: flex-end;
  }
  .btn-login {
    margin-left: 20px;
  }
}
</style>

