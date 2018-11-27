<template>
  <div class="m-cont">
    <Head :headData="1">维修工单</Head>
    <div class="form">
      <div v-for="(it,index) in formData" class="item">
        <div class="header">
          <div>
            <span class="workTime">项目信息(<span>{{index+1}}</span>)</span>
            <span @click="reduceItem(index)" v-if="formData.length > 1" class="del">删除</span>
          </div>
        </div>
        <group class="describe">
          <div @click="showFilter(it)">
            <x-input title="维修项目"
                     placeholder="请选择"
                     text-align="right"
                     :show-clear="false"
                     readonly
                     :value="map[it.id]"
                     class="require stationItem">
            </x-input>
          </div>
          <div class="list-item" style="border-bottom:0">
            <div class="text need">数量</div>
            <div class="inputNum">
              <number-count :num="it.number" @input="it.number = arguments[0]"></number-count>
            </div>
          </div>
        </group>
      </div>
    </div>
    <filter-picker @change="change" :options="[opts.options]" ref="picker1"></filter-picker>
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
  import {Cell, Group, XInput} from 'vux'
  import FilterPicker from '../components/filterPicker'
  import NumberCount from '../components/numberCount'
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import clone from '../lib/json/clone'

  export default {
    components: {
      NumberCount,
      FilterPicker,
      Cell,
      Group,
      XInput
    },
    data () {
      return {
        focus: null,
        isLock: false,
        formData: [{
          id: '',
          number: 1
        }],
        opts: {
          options: []
        },
        resouseOpts: {
          options: []
        },
        map: {}
      }
    },
    computed: {
      ...mapGetters(['repairInfo'])
    },
    // watch: {
    //   formData: {
    //     handler: function (evt) {
    //       this.filterDouble(evt);
    //     },
    //     deep: true    //深度监听
    //   }
    //
    // },
    methods: {
      ...mapMutations(['setDealScene']),
      // filterDouble(evt){
      //   let arr = evt.map(res => res.id * 1)
      //   this.opts.options = this.resouseOpts.filter(res => arr.indexOf(res.value) === -1)
      // },
      init () {
        this.getOption()
      },
      fillData () {
        if (this.repairInfo.maintenance_parts) {
          this.formData = clone(this.repairInfo.maintenance_parts)
        }
      },
      submit () {
        this.verify()
          .then(res => {
            this.setDealScene({name: 'maintenance_parts', data: this.formData})
            this.postAjax(this.$api.saveRepairItem, {
              mtc_a5_maintenance_parts: this.formData,
              mtc_a10_order_id: this.repairInfo.baseInfo.mtc_a10_order_id
            })
              .then(res => {
                this.$vux.toast.show(res.msg)
                this.$router.go(-1)
              })
          })
      },
      verify () {
        return new Promise((resolve, reject) => {
          if (this.formData.filter(res => !res.id).length) {
            this.$vux.toast.show('请选择维修项目')
            reject()
          } else {
            resolve()
          }
        })
      },
      postAjax (url, data) {
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
      getOption () {
        this.postAjax(this.$api.repairItemOpts)
          .then(res => {
            let arr = res.data.data
            this.resouseOption = arr
            this.opts.options = arr.map(res => {
              return {name: res.mtc_a2_parts_name, value: res.mtc_a2_maintain_parts_id}
            })
            this.opts.options.forEach(rs => {
              this.map[rs.value] = rs.name
            })
            // this.resouseOpts = clone(this.opts.options)
            this.fillData()
          })
      },
      reduceItem (i) {
        this.formData.splice(i, 1)
      },
      addItem () {
        this.formData.push({id: '', number: 1})
      },
      showFilter (item) {
        this.focus = item
        this.$refs.picker1.show()
      },
      change (e) {
        this.focus.id = e
        this.focus.name = this.map[e]
      }
    },
    mounted () {
      if (this.repairInfo.dealScene.maintenance_parts.length) {
        this.formData = clone(this.repairInfo.dealScene.maintenance_parts)
      }
      this.init()
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
        .stationItem {
          border-bottom: 1px solid #eaeaea;
          margin: 0 24px;
          padding: 0;
        }
        .list-item {
          height: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 30px;
          color: #252525;
          margin: 0 20px;
          margin-left: 10px;
          border-bottom: 1px solid #eaeaea;
          .text {
            font-size: 28px;
            &.need {
              &:before {
                content: "*";
                color: #ef2403;
                font-size: 28px;
                position: relative;
                top: 5px;
              }
            }
          }
        }
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
        font-size: 28px;
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
