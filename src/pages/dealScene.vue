<template>
  <div class="m-cont">
    <Head :headData="1">
      现场处理
      <span @click="save" class="right" slot="right">保存</span>
    </Head>
    <div class="model-area detail-wrap form">
      <div class="list-item">
        <group class="maintenanceRegistration">
          <x-input @input="oninput" v-model="formData.mileage" title="车辆行驶里程" placeholder="请输入" text-align="right"
                   class="require"></x-input>
        </group>
      </div>
      <div class="list-item normalItem">
        <div class="text need">4位确认码</div>
        <div class="inputNum">
          <input @focus="clearNum" maxlength="4" v-model.trim="formData.confirm_code" type="tel">
          <div class="showNum">
            <div>{{formData.confirm_code[0]}}</div>
            <div>{{formData.confirm_code[1]}}</div>
            <div>{{formData.confirm_code[2]}}</div>
            <div>{{formData.confirm_code[3]}}</div>
          </div>
        </div>
      </div>
      <div class="list-item textAreaItem">
        <div class="text need">车现场勘查描述</div>
        <div class="textAreaItemDiv">
          <group style="width: 100%">
            <x-textarea v-model="formData.locale_describe" placeholder="请输入200字以内的描述" :max="200"></x-textarea>
          </group>
        </div>
      </div>
      <group class="maintenanceRegistration">
        <cell title="维修项目记录" @click="repairItem" link="repairItem" class="require"></cell>
        <x-switch title="是否替换车" :value-map="[0,1]" v-model="formData.is_change_car"></x-switch>
        <x-input max="8" title="替换车牌号" v-if="formData.is_change_car === 1" v-model="formData.change_plate_number"
                 placeholder="请输入"
                 text-align="right"></x-input>
      </group>
      <div class="info-cont">
        <div class="repairPhotos">
          <p>现场故障图片</p>
          <div class="pic-wrap">
            <div v-for="(item,index) in showImg.fault_images" class="pic-content">
              <div class="pic-border">
                <div v-if="item" class="itemImg">
                  <img @click="delPic(index,'fault_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                  <img @click="previewPhoto(item)" :src="item" alt="">
                </div>
                <img v-if="!item" @click="startPhotoForResult({type:1,params:`fault_images-${index}`})" :src="defImg"
                     alt="">
              </div>
              <p class="pic-illustrate">故障图片{{index+1}}</p>
            </div>
          </div>
          <div class="pic-wrap">
            <div v-for="(item,index) in showImg.vicode_images" class="pic-content">
              <div class="pic-border">
                <div v-if="item" class="itemImg">
                  <img @click="delPic(index,'vicode_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                  <img @click="previewPhoto(item)" :src="item" alt="">
                </div>
                <img v-if="!item" @click="startPhotoForResult({type:1,params:`vicode_images-${index}`})" :src="defImg"
                     alt="">
              </div>
              <p class="pic-illustrate">车架号</p>
            </div>
            <div v-for="(item,index) in showImg.dashboard_images" class="pic-content">
              <div class="pic-border">
                <div v-if="item" class="itemImg">
                  <img @click="delPic(index,'dashboard_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                  <img @click="previewPhoto(item)" :src="item" alt="">
                </div>
                <img v-if="!item" @click="startPhotoForResult({type:1,params:`dashboard_images-${index}`})"
                     :src="defImg" alt="">
              </div>
              <p class="pic-illustrate">仪表盘</p>
            </div>
            <div v-for="(item,index) in showImg.post_images" class="pic-content">
              <div class="pic-border">
                <div v-if="item" class="itemImg">
                  <img @click="delPic(index,'post_images')" class="delPic" src="../images/icon/delPic.png" alt="">
                  <img @click="previewPhoto(item)" :src="item" alt="">
                </div>
                <img v-if="!item" @click="startPhotoForResult({type:1,params:`post_images-${index}`})" :src="defImg"
                     alt="">
              </div>
              <p class="pic-illustrate">维修单</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <div @click="submit('tran-maintain')" class="btn1">转维修厂维修</div>
      <div @click="submit('done')" class="btn2">已解决</div>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, XInput, XTextarea, XSwitch} from 'vux'
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import clone from '../lib/json/clone'
  import merge from '../lib/json/merge'

  const defImg = require('../images/picAdd.png')
  export default {
    name: 'dealScene',
    components: {
      Group,
      XInput,
      XTextarea,
      Cell,
      XSwitch
    },
    data () {
      return {
        data: {},
        img: '',
        defImg,
        formData: {
          mileage: '',
          confirm_code: '',
          locale_describe: '',
          is_change_car: 0,
          change_plate_number: '',
          fault_images: [null, null, null, null, null, null, null, null, null],
          vicode_images: [null],
          dashboard_images: [null],
          post_images: [null]
        },
        showImg: {
          fault_images: [null, null, null, null, null, null, null, null, null],
          vicode_images: [null],
          dashboard_images: [null],
          post_images: [null]
        }
      }
    },
    computed: {
      ...mapGetters(['repairInfo', 'setDealScene'])
    },
    beforeRouteLeave (to, from, next) {
      this.setRepairInfo({name: 'dealScene', data: this.formData})
      this.setRepairInfo({name: 'showImg', data: this.showImg})
      next()
    },
    methods: {
      ...mapMutations(['setRepairInfo']),
      save(){
        let params = clone(this.formData);
        let arr = ['fault_images', 'vicode_images', 'dashboard_images', 'post_images']
        arr.forEach(res => {
          params[res] = params[res].filter(rs => rs);
        })
        this.postAjax(this.$api.saveOutsideInfo, params).then(res => {
          this.$vux.toast.show(res.msg)
          if (res.code === 0) {
            this.$router.push('/')
          }
        })
      },
      clearNum (e) {
        this.formData.confirm_code = ''
      },
      oninput (e) {
        e = e.replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').match(/^\d*(\.?\d{0,1})/g)[0] || ''
        this.$nextTick(() => {
          this.formData.mileage = e
        })
      },
      previewPhoto(url) {
        webBridge.previewPhoto(url)
      },
      delPic (index, name) {
        let obj = clone(this.showImg)
        this.formData[name][index] = null
        obj[name][index] = null
        this.showImg = obj;
      },
      onPhotoResult (data, params) {
        let obj = this.showImg[params.split('-')[0]]
        let formImg = this.formData[params.split('-')[0]]
        let arr = clone(obj)
        let img = `data:image/png;base64,${data.image}`
        this.postAjax(this.$api.upDatePhoto, {image: img})
          .then(res => {
            formImg[params.split('-')[1]] = res.data.save_url
            arr[params.split('-')[1]] = img
            this.showImg[params.split('-')[0]] = arr
          })
      },
      startPhotoForResult ({type, params}) {
        webBridge.startPhotoForResult(type,params)
      },
      repairItem () {
        this.$router.push({name: 'repairItem'})
      },
      submit (type) {
        let params = clone(this.formData);
        params.result = type
        let arr = ['fault_images', 'vicode_images', 'dashboard_images', 'post_images']
        arr.forEach(res => {
          params[res] = params[res].filter(rs => rs);
        })
        this.verify()
          .then(res => {
            this.postAjax(this.$api.addOutsideInfo, params).then(res => {
              this.$vux.toast.show(res.msg)
              if (res.code === 0) {
                this.$router.push('/')
              }
            })
          })

      },
      verify () {
        let hash = {
          mileage: '车辆行驶里程',
          confirm_code: '4位确认码',
          locale_describe: '车辆现场查看描述',
          maintenance_parts: '维修项目记录'
        }
        return new Promise((resolve, reject) => {
          for (let k in hash) {
            if (!this.formData[k].length && hash[k]) {
              this.$vux.toast.show(hash[k] + '不能为空')
              reject('fail')
              return false
            }
          }
          resolve()
        })
      },
      postAjax (url, data) {
        this.$vux.loading.show()
        return new Promise((resolve, reject) => {
          this.$axios.post(url, data).then(res => {
            this.$vux.loading.hide()
            if (res.code === 0) {
              resolve(res)
            } else {
              this.$vux.toast.show(res.msg)
              reject(res)
            }
          }).catch(err => {
            this.$vux.loading.hide()
            reject(err)
          })
        })

      },
      initShowImg(evt){
        if(this.repairInfo.showImg){//状态管理器中有数据则不使用请求数据
          this.showImg = this.repairInfo.showImg;
        }else{
          let arr = ['fault_images', 'vicode_images', 'dashboard_images', 'post_images']
          arr.forEach(res => {
            evt[res].forEach((rs,i)=>{
              this.showImg[res][i] = rs.display_url;
              this.formData[res][i] = rs.save_url
            })
          });
        }
      }
    },
    mounted () {
      this.data = this.repairInfo.baseInfo;
      this.postAjax(this.$api.getOutsideInfo,{order_id:this.data.mtc_a10_order_id})
        .then(res=>{
          this.formData = merge(this.formData, res.data);
          this.formData = merge(this.formData, this.repairInfo.dealScene);
          this.initShowImg(res.data);
          this.formData.order_id = this.data.mtc_a10_order_id;
          window.webBridge.onPhotoResult = this.onPhotoResult;
        })

    }
  }
</script>

<style lang="scss" scoped>
  .m-cont {
    padding-bottom: 100px;
    .detail-wrap {
      color: #252525;
      background-color: #fff;
      margin-bottom: 14px;
      .list-item {
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        color: #252525;
        &.textAreaItem {
          margin: 6px 12px 0px 6px;
          height: auto;
          flex-direction: column;
          align-items: start;
          border-bottom: 1px solid #eaeaea;
          .text{
            width: 100%;
          }
          .textAreaItemDiv {
            width: 100%;
            box-sizing: border-box;
            padding: 0 24px;
          }
        }
        &.normalItem {
          margin: 0 20px;
          margin-left: 10px;
          border-bottom: 1px solid #eaeaea;
        }
        .maintenanceRegistration {
          width: 100%;
        }
        .text {
          font-size: 32px;
          &.need {
            font-size: 28px;
            &:before {
              content: "*";
              color: #ef2403;
              font-size: 28px;
              position: relative;
              top: 5px;
            }
          }
        }
        .inputNum {
          display: flex;
          height: 100%;
          width: 40%;
          position: relative;
          align-items: center;
          justify-content: flex-end;
          .showNum {
            display: flex;
            justify-content: space-between;
            width: 260px;
            height: 55px;
            > div {
              width: 46px;
              text-align: center;
              color: #19c280;
              font-size: 28px;
              border-bottom: 2px solid #EAEAEA;
            }
          }
          > input {
            opacity: 0;
            color: transparent;
            position: absolute;
            width: 100%;
            height: 80%;
            &:focus {
              text-indent: 999em;
              transform: scale(0);
              &~.showNum{
                >div{
                  border-color: #19c280;
                }
              }
            }

          }
        }
        .value {
          color: #666666;
        }
      }
      .info-cont {
        padding: 0 0 12px;
        .item {
          font-size: 28px;
          display: flex;
          line-height: 40px;
          color: #666666;
          padding-top: 16px;
          &:first-child {
            padding-top: 0;
          }
          .text {
            width: 20%;
            padding-right: 10px;
          }
          .value {
            width: 80%;
            text-align: right;
            word-wrap: break-word;
            word-break: break-all;
            p {
              text-align: left;
              display: inline-block;
            }
          }
          .check {
            color: #20b96d;
          }
        }
      }
      .repairPhotos {
        font-size: 28px;
        color: #252525;
        padding: 0 24px;
        padding-top: 24px;
        p {
          line-height: 40px;
          padding-bottom: 22px;
          font-size: 28px;
        }
        .pic-wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .pic-content {
            text-align: center;
            .pic-border {
              height: 28vw;
              width: 28vw;
              border-radius: 16px;
              .itemImg {
                width: 100%;
                height: 100%;
                position: relative;
                .delPic {
                  position: absolute;
                  right: -15px;
                  top: -15px;
                  width: 32px;
                  height: 32px;

                }
                > img {
                  border-radius: 10px;
                }
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
            .pic-illustrate {
              padding-top: 12px;
            }
          }
        }
      }
    }
    .btns {
      position: fixed;
      width: 100%;
      bottom: 0;
      display: flex;
      margin-top: 20px;
      font-size: 30px;
      > div {
        width: 50%;
        height: 98px;
        color: #fff;
        line-height: 98px;
        text-align: center;
      }
      .btn1 {
        background: linear-gradient(
            90deg,
            rgba(254, 197, 35, 1) 0%,
            rgba(254, 165, 36, 1) 100%
        );
      }
      .btn2 {
        background: linear-gradient(
            90deg,
            rgba(32, 222, 148, 1) 0%,
            rgba(13, 184, 156, 1) 100%
        );
      }
    }
  }
</style>
