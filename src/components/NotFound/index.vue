<template>
    <div class="notfound-wrapper">
        <div class="notfound-container">
            <div class="img-404"></div>
            <p class="text-404">哎呀迷路了...</p>
            <van-button type="primary" @click="$router.push('/home')">返回首页</van-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.notfound-wrapper {
  width: 60%;
  margin: 20% auto 0;
  .notfound-container {
    width: 100%;
    text-align: center;
    .img-404 {
      height: 210px;
      background: url('../../assets/images/404.png') center center no-repeat/cover;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .text-404 {
      margin: 20px 0;
      font-size: 20px;
    }
  }
}
</style>

