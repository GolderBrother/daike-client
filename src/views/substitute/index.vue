<template>
  <div class="container">
    <van-row class="row tip" type="flex" align="center">
      <van-icon name="peer-pay"></van-icon>
      <h2>寻找帮太子代课的人...</h2>
    </van-row>
    <van-card v-for="course in courses" :key="course.id" :thumb="course.publisherHeader || thumbImg">
      <div class="title" slot="title">
        课程名称：{{course.courseName}} <br />
      </div>
      <div class="desc" slot="desc">
        上课时间：{{course.courseTime}} <br /> 上课地点：{{course.coursePlace}} - {{course.courseClass}} <br /> 赏金：¥ {{course.reward ? course.reward : 0}}<br />
      </div>
      <div slot="footer">
        <van-button @click="toggleCourseDetail(course)" size="mini">详情</van-button>
        <van-button @click="onSubstituteClicked(course)" size="mini" type="primary" plain>代课</van-button>
      </div>
    </van-card>
    <van-pagination 
      v-model="currentPage" 
      :total-items="totalItems" 
      :items-per-page="10"
      @change = "onChange"
    />
    <van-sku v-model="isShowCourse" :sku="course" :goods="courseTitle" close-on-click-overlay>
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price">
        <div class="van-sku__goods-price">
          <span>赏金：</span>
          <span class="van-sku__price-symbol">￥</span>
          <span class="van-sku__price-num">{{ course.reward || 0}}</span>
        </div>
      </template>
      <!-- 自定义 sku-group -->
      <template slot="sku-group">
        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            学校：
          </van-col>
          <van-col span="10">
            {{course.school}}
          </van-col>
        </van-row>

        <van-row v-show="course.hasName" class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            姓名：
          </van-col>
          <van-col span="10">
            {{course.publisherName}}
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

        <van-row v-show="course.hasPhone" class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            电话：
          </van-col>
          <van-col span="10">
            {{course.phone}}
          </van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            开课时间：
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
      </template>

      <!-- 留言区 -->
      <template slot="sku-stepper">
        <van-row type="flex">
          <van-col span="5" offset="1">
            留言：
          </van-col>
          <van-col span="17">
            {{course.remark}}
          </van-col>
        </van-row>
      </template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button bottom-action @click="onCollectionClicked">收藏课程</van-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="onSubstituteClicked(course)">立即代课</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      totalItems: 0,
      courses: "",
      course: {},
      isShowCourse: false,
      // 引入静态资源，require('xxx') 引用的相对路径
      thumbImg: require("../../assets/images/daike.png")
    };
  },
  methods: {
    toggleCourseDetail(course) {
      this.isShowCourse = true;
      this.course = course;

      // 这里这么些是因为 van-sku 组件的限制
      // Vant 的文档写的有点让人难受
      // 有兴趣的话可以去看看： https://youzan.github.io/vant/#/zh-CN/sku
      this.course.tree = [
        {
          v: [{}, {}]
        }
      ];
    },
    // 代课
    async onSubstituteClicked(course) {
      const { userId, userName } = this.user;
      if(!userId || !userName){
        this.$toast.fail("请先登录");
        this.isShowCourse = false;
        return;
      }
      if (userId == course.publisher) {
        this.$toast("不能代自己发布的课程！");
        this.isShowCourse = false;
        return;
      }
      try {
        const res = await this.$http.substitute({
          userId,
          userName,
          course
        });
        if (res.code == 1) {
          this.$toast("代课成功！");
          this.isShowCourse = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 收藏
    async onCollectionClicked() {
      const { userId } = this.user;
      if(!userId){
        this.$toast.fail("请先登录");
        this.isShowCourse = false;
        return;
      }
      try {
        const { code, msg } = await this.$http.collectCourse({
          userId,
          courseId: this.course.id
        });
        if (code == 1) {
          this.$toast(msg);
          this.isShowCourse = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 分页
    async onChange(curPage) {
      try {
        console.log("change", curPage);
        // 查询开始页数pageIndex*pageNum和查询条数pageNum
        const { code, data } = await this.$http.getCourseByPage({
          pageNum: 10,
          pageIndex: curPage,
          status: "open"
        });
        if (code == 1) {
          this.courses = data;
          console.log(this.courses);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取所有课程
    async getCourses() {
      // 允许存在多个toast实例
      this.$toast.allowMultiple();
      const toastLoading = this.$toast.loading({
        mask: true,
        duration: 0,
        message: "加载中..."
      });
      try {
        const { data } = await this.$http.getCourse({
          status: "open"
        });
        toastLoading.clear();
        this.courses = data;
        this.totalItems = data.length;
      } catch (error) {
        console.log(error);
        toastLoading.clear();
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
    courseTitle() {
      const { course: { courseName, publisherHeader }, thumbImg } = this;
      return {
        title: courseName,
        picture: publisherHeader || thumbImg
      };
    }
  },
  mounted() {
    this.getCourses();
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
}

.desc {
  font-size: 12px;
}

.row {
  margin: 10px 0 10px;
}

.container /deep/ .van-sku__goods-name {
  font-size: 16px;
}

.tip {
  margin: 10px;
  h2 {
    margin-left: 10px;
  }
}
</style>

