<template>
  <div class="m-cont">
    <app-head :headData="1">电话沟通</app-head>
    <div class="m-goTelephone">
      <div class="textarea">
        <div class="desc">处理说明:</div>
        <textarea placeholder="请输入处理说明" v-model="formData.mtc_a6_description" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div @click="submit('trans-outside')" class="btns btn1" :class="{disabled:!formData.mtc_a6_description}">转现场处理</div>
      <div @click="submit('tran-maintain')" class="btns btn2" :class="{disabled:!formData.mtc_a6_description}">转维修厂维修</div>
      <div @click="submit('done')" class="btns btn2" :class="{disabled:!formData.mtc_a6_description}">已解决</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import IndexHead from '../components/indexHead'
import MescrollVue from 'mescroll.js/mescroll.vue'
import formatDate from '../lib/formatDate'
import AppHead from '../components/appHead'

export default {
  name: 'goTelephone',
  components: {
    AppHead
  },
  data() {
    return {
      isLock:false,
      formData: {
        mtc_a10_order_id: null,
        mtc_a6_description: null,
        result: null
      }
    }
  },
  computed: {
    ...mapGetters([]),
  },
  mounted() {
    this.formData.mtc_a10_order_id = this.$route.params.data.mtc_a10_order_id
  },
  methods: {
    submit(type) {
      this.formData.result = type;
      this.postAjax(this.$api.phoneHandle, this.formData)
        .then(res => {
          if (res.code === 0) {
            this.$vux.toast.show(res.msg)
            this.$router.go(-1)
          }
        })
    },
    postAjax(url, data) {
      if(this.isLock) return;
      this.isLock = true;
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then(res => {
          this.isLock = false;
          if (res.code === 0) {
            resolve(res)
          } else {
            this.$vux.toast.show(res.msg)
            reject(res)
          }
        }).catch(err => {
          this.isLock = false;
          reject(err)
        })
      })

    }
  }
}

</script>

<style scoped lang="less">
.m-cont {
  height: 100vh;
  width: 100vw;
  .m-goTelephone {
    .textarea {
      height: 500px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 116px;
      display: flex;
      background: #fff;
      padding: 25px 10px;
      .desc {
        font-size: 32px;
        width: 200px;
        &:before {
          content: "*";
          color: #ef2403;
          font-size: 28px;
        }
      }
      > textarea {
        line-height: 50px;
        font-size: 32px;
        padding-right: 20px;
        width: 100%;
        height: 100%;
        border: none;
        box-sizing: border-box;
        outline: 0;
      }
    }
    .btns {
      margin: 0 auto;
      margin-bottom: 50px;
      line-height: 80px;
      height: 80px;
      width: 586px;
      font-size: 30px;
      text-align: center;
      border-radius: 80px;
      color: #fff;
      &.btn1 {
        background: linear-gradient(
          90deg,
          rgba(254, 197, 35, 1) 0%,
          rgba(254, 165, 36, 1) 100%
        );
      }
      &.btn2 {
        background: linear-gradient(
          90deg,
          rgba(32, 222, 148, 1) 0%,
          rgba(13, 183, 156, 1) 100%);
        }
        &.disabled{
          background:#ccc;
        }
    }
  }
}
</style>
