<template>
  <div class="m-cont">
    <Head :headData="1">附加费</Head>    <div class="form">
      <div v-for="(it,index) in formData" class="item">
        <div class="header">
          <div>
            <span class="workTime">附加费信息(<span>{{ index+1 }}</span>)</span>
            <span @click="reduceItem(index)" v-if="formData.length > 1" class="del">删除</span>
          </div>
        </div>
        <group class="describe">
          <x-input title="费用名称"
                   @on-blur="blur"
                   placeholder="请输入"
                   text-align="right"
                   :show-clear="false"
                   class="require"
                   v-model="it.name"
                   :max="20">
          </x-input>
          <x-input title="费用说明"
                   @on-blur="blur"
                   placeholder="请输入"
                   text-align="right"
                   :show-clear="false"
                   class="require"
                   v-model="it.describe"
                   :max="20">
          </x-input>
        </group>
      </div>
    </div>
    <div @click="addItem" class="addBtn">
      <img src="../images/icon/add.png" alt="">
      增加配件信息
    </div>
    <div class="submit-wrap">
      <div class="submit" @click="submit">保存</div>
    </div>
  </div>
</template>

<script>
import { Cell, Group, XInput } from 'vux'
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    Cell,
    Group,
    XInput
  },
  data() {
    return {
      formData: [{
        name: '',
        describe: ''
      }],
    }
  },
  computed: {
    ...mapGetters(['repairInfo'])
  },
  mounted() {
    this.fillData()
  },
  methods: {
    blur(){
      window.scrollTo(0,window.scrollY)
    },
    reduceItem(i) {
      this.formData.splice(i, 1);
    },
    addItem() {
      this.formData.push({ name: "", time: '' })
    },
    submit() {
      this.postAjax(this.$api.extraCharge, { additional_cost: this.formData, order_id: this.repairInfo.baseInfo.mtc_a10_order_id })
        .then(res => {
          this.$vux.toast.show(res.msg);
          this.$router.go(-1)
        })
      console.log(this.formData)
    },
    postAjax(url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then(res => {
          if (res.code === 0) {
            resolve(res)
          } else {
            this.$vux.toast.show(res.msg)
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    fillData() {
      if (this.repairInfo.extraCharge.length) {
        this.formData = this.repairInfo.extraCharge
      }
    },
  }
}
</script>

<style scoped lang="scss">
.m-cont {
  color: #252525;
  padding-bottom: 120px;
  height: 100%;
  .form {
    .item {
      margin-bottom: 20px;
    }
  }
  .addBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 50px auto;
    width: 210px;
    font-size: 28px;
    color: #19c280;
    > img {
      width: 39px;
      height: 39px;
    }
  }
  .header {
    height: 86px;
    line-height: 86px;
    padding: 0 23px;
    font-size: 28px;
    background: #fff;
    display: flex;
    > div {
      width: 100%;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      justify-content: space-between;
    }
    .workTime {
      flex: 1;
    }
    .del {
      color: #19c280;
    }
  }
  .submit-wrap {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding-bottom: 24px;
    z-index: 99;
    background: #f9f9f9;
    .submit {
      width: 586px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      background: linear-gradient(
        90deg,
        rgba(32, 222, 148, 1) 0%,
        rgba(13, 183, 156, 1) 100%
      );
      box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
      border-radius: 80px;
      margin: 0 auto;
    }
  }
}
</style>


