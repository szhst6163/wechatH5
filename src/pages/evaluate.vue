<template>
  <div class="m-cont">
    <header>
      <div class="img-wrap">星级评价</div>
      <div class="good-img">
        <img src="../images/good.png" alt="">
      </div>
    </header>
    <div class="content">
      <div class="star-wrap">
        <span>响应时间</span>
        <rater v-model="prams.point_response_time"
               :min="1"
               :margin="5"
               star='<span class="star"></span>'
               :disabled="!showBtn">
        </rater>
      </div>
      <div class="star-wrap">
        <span>服务质量</span>
        <rater v-model="prams.point_skill"
               :min="1"
               :margin="5"
               star='<span class="star"></span>'
               :disabled="!showBtn"></rater>
      </div>
      <div class="star-wrap">
        <span>技能态度</span>
        <rater v-model="prams.point_service"
               :min="1"
               :margin="5"
               star='<span class="star"></span>'
               :disabled="!showBtn"></rater>
      </div>
      <div class="textarea-wrap">
        <x-textarea v-model="prams.comment" placeholder="您的评价决定了我们的江湖地位，请认证对待" :max="200" :disabled="!showBtn"></x-textarea>
      </div>
    </div>
    <footer>
      <div class="call-phobe btn">
        <a href="tel:400-860-4558">致电客服</a>
      </div>
      <div class="submit btn" @click="submit" v-if="showBtn">提交评论</div>
    </footer>
  </div>
</template>

<script>
import { Rater, XTextarea } from 'vux'
import axios from 'axios'
export default {
  components: {
    Rater,
    XTextarea
  },
  data() {
    return {
      prams: {
        point_response_time: 0,
        point_skill: 0,
        point_service: 0,
        comment: '',
      },
      showBtn: false
    }
  },
  mounted() {
    this.init()
    this.prams.visit_code = this.$route.query.c
  },
  methods: {
    init() {
      this.postAjax(this.$api.gerVisit, { visit_code: this.$route.query.c }).then(res => {
        if (res.code === 0 && res.data.isNew === 0) {
          this.showBtn = false
          this.prams = res.data
          this.prams.visit_code = this.$route.query.c
        } else {
          this.showBtn = true
        }
      })
    },
    submit() {
      // if (!this.prams.comment) {
      //   this.$vux.toast.show('评论不可以为空')
      //   return
      // }
      this.postAjax(this.$api.saveVisit, this.prams).then(res => {
        this.showBtn = false
        this.$vux.toast.show('评论成功')
      })
    },
    postAjax(url, data) {
      let that = this
      return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            that.$vux.toast.show(res.data.msg)
            reject(res.data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
.m-cont {
  min-height: 100vh;
  background-color: #ffffff;
}
header {
  background-image: url("../images/myPage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 365px;
  padding: 0 24px;
  box-sizing: border-box;
  .img-wrap {
    padding-top: 64px;
    text-align: center;
    color: #ffffff;
    font-size: 36px;
    line-height: 50px;
  }
  .good-img {
    margin-top: 28px;
    text-align: center;
    img {
      width: 221px;
      height: 163px;
    }
  }
}
.content {
  padding: 60px 24px 260px;
  .star-wrap {
    display: flex;
    align-items: center;
    height: 45px;
    padding-bottom: 45px;
    > span {
      font-size: 32px;
      color: rgba(37, 37, 37, 1);
      padding-right: 60px;
    }
  }
  .vux-rater {
    .vux-rater-inner {
      font-size: 40px;
    }
  }
  .textarea-wrap {
    background: rgba(249, 249, 249, 1);
    height: 320px;
  }
}
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  margin-bottom: 40px;
  padding-top: 40px;
  background-color: #fff;
  .btn {
    width: 586px;
    height: 80px;
    line-height: 80px;
    border-radius: 80px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0 auto;
  }
  .call-phobe {
    background: linear-gradient(
      90deg,
      rgba(254, 197, 35, 1) 0%,
      rgba(254, 165, 36, 1) 100%
    );
    margin-bottom: 50px;
    a {
      color: #fff;
      display: inline-block;
      width: 100%;
    }
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(32, 222, 148, 1) 0%,
      rgba(13, 183, 156, 1) 100%
    );
  }
}
</style>
<style lang="scss">
.textarea-wrap {
  margin-bottom: 20px;
  .vux-x-textarea {
    height: 100%;
    .weui-cell__bd {
      height: 100%;
      textarea {
        background: rgba(249, 249, 249, 1);
        font-size: 28px;
        height: 80%;
        padding: 24px;
        box-sizing: border-box;
      }
    }
  }
}
.star-wrap {
  .vux-rater {
    .is-active {
      .vux-rater-inner {
        .star {
          background-image: url("../images/icon/fullStat.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 40px;
          height: 40px;
          display: inline-block;
        }
      }
    }
  }
  .vux-rater {
    .vux-rater-inner {
      .star {
        background-image: url("../images/icon/star.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        display: inline-block;
      }
    }
  }
}
</style>

