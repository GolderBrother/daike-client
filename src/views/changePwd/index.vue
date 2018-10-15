<template>
  <div class="login-container">
    <img class="logo" src="@/assets/images/daike.png">

    <van-cell-group class="box">
      <van-field v-model="account" label-align="left" type="text" required clearable label="用户名" icon="question" placeholder="请输入用户名"/>

      <van-field v-model="password" label-align="left" type="password" clearable label="新密码" placeholder="请输入新密码" required />

      <van-field v-model="rePassword" label-align="left" type="password" clearable label="新密码" placeholder="请再次输入新密码" required @keyup.enter.native="handleChange"/>
    </van-cell-group>
    </van-row>
    <van-row class="btn-box">
      <van-button size="small" @click="$router.push('/login')">
        返回登录
      </van-button>

      <van-button type="primary" class="btn-login" size="small" @click="handleChange">
        确认更改
      </van-button>
    </van-row>

  </div>
</template>

<script>
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
    async handleChange() {
      try {
        const { account, password, rePassword } = this;
        if (account == "" || password == "") {
          this.$toast.fail("用户名或密码不能为空！");
          return;
        }
        if (password !== rePassword) {
          this.$toast.fail("两次输入密码不一致！");
          return;
        }
        const { code, msg } = await this.$http.changePwd({
          account,
          password
        });
        if (code === 1) {
          this.$toast.success(msg);
          this.account = this.password = this.rePassword = "";
          this.$router.push('/login');
        }
      } catch (error) {
        console.log(error);
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
  .btn-box {
    margin: 10px 0;
    .btn-login {
      margin-left: 20px;
    }
  }
}
</style>

