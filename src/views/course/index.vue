<template>
  <div class="course">
    <van-tabs @click="onChangeTab">
      <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="tab.name">
        <van-swipe-cell :right-width="65" :left-width="65" @click.native="showDetail(course)" v-for="(course,index) in courses" v-if="course" :key="course.id" :index="index" :type="tab.type" :on-close="deleteClose">
          <span slot="left">{{ tab.type | leftBtn }}</span>
          <van-card :thumb="course.publisherHeader || thumbImg">
            <div class="title" slot="title">
              课程名称：{{course.courseName}} <br />
            </div>
            <div class="desc" slot="desc">
              上课时间：{{course.courseTime}} <br /> 上课地点：{{course.coursePlace}} - {{course.courseClass}} <br /> 赏金：¥ {{course.reward ? course.reward : 0}}<br />
            </div>
          </van-card>
          <span slot="right">删除</span>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>

    <van-popup v-model="isShowDetail" position="bottom" :overlay="true">
      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          学校：
        </van-col>
        <van-col span="10">
          {{course.school}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          课程名称：
        </van-col>
        <van-col span="10">
          {{course.courseName}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasReward" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          赏金：
        </van-col>
        <van-col span="10">
          ¥ {{course.reward}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasName" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          发布者：
        </van-col>
        <van-col span="10">
          {{course.publisherName}}
        </van-col>
      </van-row>

      <van-row v-show="course.receiverName" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          代课人：
        </van-col>
        <van-col span="10">
          {{course.receiverName}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课时间：
        </van-col>
        <van-col span="10">
          {{course.courseTime}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课讲次：
        </van-col>
        <van-col span="10">
          {{course.courseClass}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课地点：
        </van-col>
        <van-col span="10">
          {{course.coursePlace}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasStuId" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          学号：
        </van-col>
        <van-col span="10">
          {{course.studentId}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          发布时间：
        </van-col>
        <van-col span="10">
          {{course.publishTime}}
        </van-col>
      </van-row>

      <van-row v-show="course.closeTime" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          关闭时间：
        </van-col>
        <van-col span="10">
          {{course.closeTime}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasPhone" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          联系电话：
        </van-col>
        <van-col span="10">
          {{course.phone}}
        </van-col>
      </van-row>

      <van-row v-show="course.remark" class="row" type="flex">
        <van-col span="5" offset="1">
          备注：
        </van-col>
        <van-col span="17">
          {{course.remark}}
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      courses: "",
      course: "",
      isShowDetail: false,
      // 引入静态资源，require('xxx') 引用的相对路径
      thumbImg: require("../../assets/images/daike.png")
    };
  },
  computed: {
    ...mapGetters(["user", "tabs"])
  },
  methods: {
    async onChangeTab(index, title) {
      const userId = this.user.userId;
      const type = this.tabs[index].type;
      await this.getCourseByType(userId, type);
    },
    async getCourseByType(userId, type) {
      const toastLoading = this.$toast.loading({
        mask: true,
        duration: 0,
        message: "加载中..."
      });
      try {
        this.$toast.allowMultiple();
        const { data } = await this.$http.getCourseByType({
          userId,
          type
        });
        this.courses = data;
      } catch (error) {
        console.log(error);
        // this.$toast.fail({
        //   duration: 1000,
        //   message: error.message
        // });
      }
      toastLoading.clear();
    },
    showDetail(course) {
      this.isShowDetail = true;
      this.course = course;
    },

    //delete course
    async deleteClose(clickPosition, instance) {
      const { type, index } = instance.$attrs;
      const { userId } = this.user;
      const course = this.courses[index];
      const { publishTime } = course;
      console.log(clickPosition, type, userId);

      switch (clickPosition) {
        case "left":
          // /course/update
          if (type === "publish") {
            this.$store.dispatch("courseUpdate", course);
            this.$router.push("/home/publish");
          } else {
            this.showDetail(course);
          }
          break;
        case "right":
          try {
            const { msg: { n, ok } } = await this.$http.deleteCourseByType({
              userId,
              type,
              course
            });
            if (!n) {
              this.$toast.fail("课程已删除！");
            } else if (ok) {
              this.$toast.success("删除成功！");
              await this.getCourseByType(userId, type);
            } else {
              this.$toast.fail("删除失败！");
            }
            break;
          } catch (error) {
            console.log(error);
            this.$toast.fail("删除失败！");
          }
      }
    }
  },
  mounted() {
    this.getCourseByType(this.user.userId, "publish");
  },
  filters: {
    leftBtn: type => {
      let text = type === "publish" ? "更改" : "详情";
      return text;
    }
  }
};
</script>

<style lang="scss">
.course .van-tabs__content {
  height: calc(100vh - 94px);
  overflow: auto;
}

.row {
  font-size: 14px;
  margin: 10px;
}

.title {
  font-size: 14px;
}

.desc {
  font-size: 12px;
}
.van-swipe-cell {
  .van-swipe-cell__left,
  .van-swipe-cell__right {
    display: flex;
    width: 65px;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .van-swipe-cell__left {
    background-color: #7ac143;
  }
  .van-swipe-cell__right {
    background-color: #f44;
  }
}
</style>