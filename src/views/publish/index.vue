<template>
  <div class="container">
    <van-row class="row tip" type="flex" align="center">
      <van-icon name="peer-pay"></van-icon>
      <span>发布你的代课信息，寻找帮太子读书的人...</span>
    </van-row>

    <van-row class="row tip" type="flex" align="center">
      <van-icon name="clock"></van-icon>
      <span>开课时间：</span>
      <span>{{courseData.courseTime || curriculaTime}}</span>
      <van-button @click="isShowTimePicker = !isShowTimePicker" size="small">{{isShowTimePicker ? '关闭设置' : '设置时间'}}</van-button>
    </van-row>

    <van-datetime-picker v-show="isShowTimePicker" :min-date="minDate" :maxDate="maxDate" v-model="currentDate" type="datetime" cancel-button-text=" " @confirm="confirmTime" />
    
    <van-cell-group>
      <van-field required :value="publisher.school" placeholder="请输入学校名称" label="学校名" left-icon="wap-home" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="courseData.courseName" placeholder="请输入课程名称" label="课程名称" left-icon="sign" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="courseData.courseClass" placeholder="请输入第几讲课时" label="上课讲时" left-icon="pending-orders" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="courseData.coursePlace" placeholder="请输入上课地点" label="上课地点" left-icon="location" />
    </van-cell-group>

    <p class="tip-info">
      <van-icon name="question"></van-icon>
      <span>是否分享以下信息给代课人：</span>
    </p>

    <van-cell-group class="checkbox">
      <van-field v-model="publisher.account" placeholder="请输入姓名" label="姓名" left-icon="contact" />
      <van-checkbox v-model="courseData.hasName" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field v-model="publisher.studentId" placeholder="请输入学号" label="学号" left-icon="exchange" />
      <van-checkbox v-model="courseData.hasStuId" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field type="tel" v-model="publisher.phone" placeholder="请输入电话号码" label="电话" left-icon="phone" />
      <van-checkbox v-model="courseData.hasPhone" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field type="number" v-model="courseData.reward" placeholder="请输入代课赏金" label="赏金" left-icon="gold-coin" />
      <van-checkbox v-model="courseData.hasReward" />
    </van-cell-group>

    <van-cell-group class="remark">
      <van-field type="textarea" v-model="courseData.remark" placeholder="请输入备注信息" label="备注" left-icon="pending-orders" />
    </van-cell-group>

    <van-button class="btn-publish" @click="handlePublish" size="small" >{{ isUpdate ? "确认更新" : "确认发布" }}</van-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { isEmptyObj } from "@/utils/utils";
import { formatDateTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      courseData: {
        hasName: true,
        hasStuId: false,
        hasPhone: false,
        hasReward: false,
        remark: "", // 备注
        reward: "", // 赏金
        courseTime: "", // 开课时间
        courseName: "", // 课程名称
        courseClass: "", // 上课讲时（exp: 上午第一讲）
        coursePlace: "" // 上课地点
      },
      currentDate: new Date(),
      isShowTimePicker: false,
      minDate: new Date(),
      maxDate: new Date(new Date().getFullYear() + 1, 6, 17),
      publisher: {},
      isUpdate: false  // 判断是发布还是更新
    };
  },
  methods: {
    ...mapMutations({
      courseClear: "COURSE_CLEAR"
    }),
    async handlePublish() {
      if(this.isUpdate){
        this.handleUpdate();
        return;
      }
      const { courseName, courseClass, coursePlace } = this.courseData;
      if (!courseName || !courseClass || !coursePlace) {
        this.$toast("必要信息不能为空！");
        return;
      }

      let data = {
        status: "open",
        publisher: this.user.userId,
        publisherHeader: this.user.headerImg,
        schoolId: this.user.schoolId,
        school: this.user.school,
        publishTime: formatDateTime(new Date()),
        closeTime: "",
        remark: this.courseData.remark,
        receiver: "",
        receiverName: "",
        province: this.user.provinceId,
        college: this.publisher.college,
        major: this.publisher.major,
        courseName: this.courseData.courseName,
        courseTime: this.courseData.courseTime,
        courseClass: this.courseData.courseClass,
        coursePlace: this.courseData.coursePlace,
        publisherName: this.publisher.userName || "",
        studentId: this.publisher.studentId || "",
        phone: this.publisher.phone || "",
        reward: this.courseData.reward || 0,
        // 是否在课程信息中展示这些字段
        hasName: this.courseData.hasName,
        hasStuId: this.courseData.hasStuId,
        hasPhone: this.courseData.hasPhone,
        hasReward: this.courseData.hasReward
      };
      const $toastLoading = this.toastLoading();
      try {
        const res = await this.$http.publishCourse(data);
        this.$toast.allowMultiple();
        $toastLoading.clear();
        this.$toast.success("发布成功！");
        this.clearData();
      } catch (error) {
        $toastLoading.clear();
        this.$toast.fail({
          duration: 1000,
          message: error.message
        });
      }
    },
    async handleUpdate() {
      const $toastLoading = this.toastLoading();
      try {
        const courseObj = Object.assign({},this.course,this.courseData)
        console.log(courseObj)
        const res = await this.$http.updateCourse(courseObj);
        console.log(res);
        this.$toast.allowMultiple();
        $toastLoading.clear();
        this.$toast.success("更新成功！");
        this.clearData();
        // this.$store.dispatch("courseClear");
        this.courseClear();
        this.$router.push("/home/course");
      } catch (error) {
        $toastLoading.clear();
      }
    },
    confirmTime(value) {
      this.courseData.courseTime = formatDateTime(value);
      this.isShowTimePicker = false;
    },
    clearData() {
      this.courseData.courseName = "";
      this.courseData.courseClass = "";
      this.courseData.coursePlace = "";
      this.courseData.reward = "";
      this.courseData.remark = "";
      this.courseData.hasStuId = false;
      this.courseData.hasPhone = false;
      this.courseData.hasReward = false;
    },
    toastLoading(){
      return this.$toast.loading({
        mask: true,
        duration: 0,
        message: "加载中..."
      });
    }
    /* 
    getCourse({
      closeTime,
      college,
      id,
      major,
      phone,
      publishTime,
      publisher,
      publisherName,
      receiver,
      receiverName,
      status,
      school,
      studentId,
      ...courseObj
    }) {
      this.courseData = courseObj;
    }
    */
  },
  computed: {
    ...mapGetters(["user", "course"]),
    curriculaTime() {
      return formatDateTime(this.currentDate);
    }
  },
  created() {
    if (!isEmptyObj(this.course)) {
      this.isUpdate = true;
      // 浅拷贝原理,这样写就不会修改store中的数据,也可以说要修改state数据 必须提交commit 一个 mutation
      this.courseData = Object.assign({},this.course);

      // this.courseData = this.course;  //报错
      // this.getCourse(this.course);
    } else {
      this.isUpdate = false;
    }
  },
  mounted() {
    this.publisher = Object.assign({}, this.user);
    // 初始化开课时间
    if(!this.isUpdate){
      this.courseData.courseTime = formatDateTime(this.currentDate);
    };
    if (!this.user.schoolId) {
      this.$dialog
        .alert({
          message: "发布课程前，请先完善个人信息！"
        })
        .then(() => {
          this.$router.push("/home/mine");
        });
    }
  },
  destroyed() {
    // 页面销毁后，清空页面数据和 store state 数据
    this.clearData();
    // this.$store.dispatch("courseClear");
    this.courseClear();
  }
};
</script>

<style lang="scss" scoped>
.tip {
  height: 40px;

  span {
    margin-left: 10px;
  }
}

.tip-info {
  line-height: 48px;
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  padding-right: 10px;

  /deep/ .van-checkbox {
    width: 23px;
  }
}

.remark {
  height: 120px;
}

.btn-publish {
  margin-top: 10px;
  float: right;
}
</style>

