<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-shop-detail">
      <div class="pic">
        <img :src="data.goods.img" alt="">
      </div>
      <div class="m-sales-count">
        <div class="salesItem">
          <ul>
            <li>
              <i><img src="../images/icon/shopName.png" alt=""></i>
              <div class="text">品名：{{data.goods.name}}</div>
            </li>
            <li>
              <i><img src="../images/icon/shopPrice.png" alt=""></i>
              <div class="text">价格￥{{data.goods.price}}</div>
            </li>
            <li>
              <i><img src="../images/icon/shopNum.png" alt=""></i>
              <div class="text">购买数量</div>
              <div class="numberCont">
                <number-count :max="99" v-model="formData.num"></number-count>
              </div>
            </li>
          </ul>
        </div>
        <div class="userItem">
          <ul>
            <li>
              <i><img src="../images/icon/userName.png" alt=""></i>
              <div class="name">姓名</div>
              <input v-model="formData.userrealname" placeholder="请输入姓名" type="text"/>
            </li>
            <li>
              <i><img src="../images/icon/phone.png" alt=""></i>
              <div class="name">手机号</div>
              <input v-model="formData.mobile" placeholder="请输入手机号" type="tel"/>
            </li>
            <li>
              <i><img src="../images/icon/address.png" alt=""></i>
              <div class="name">收货地址</div>
              <input v-model="formData.address" placeholder="请输入收货地址" type="text"/>
            </li>
          </ul>
          <div @click="submit" class="submit">立即购买</div>
        </div>
        <div class="m-shop-info">
          <div class="m-line-title">购买须知</div>
          <div class="info-cont">
            <div v-html="data.goods.purchasedesc"></div>
          </div>
        </div>
        <div class="m-shop-info">
          <div class="m-line-title">商品详情</div>
          <div class="info-cont">
            <div v-html="data.goods.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import NumberCount from "../components/numberCount";

  export default {
    name: 'shopDetail',
    components: {NumberCount},
    data() {
      return {
        formData:{
          num:1
        },
        data:{
          goods:{},
          user:{}
        }
      }
    },
    watch: {},
    created() {
    },
    computed: {},
    mounted() {
      this.init()
    },
    methods: {
      submit(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.addGoods,{...this.formData,goods_id:this.$route.query.id})
          .then(res=>{
            this.$vux.loading.hide();
            this.$vux.toast.show(res.msg);
            this.$router.go(-1)
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.shop.shopDetail,{id:this.$route.query.id})
          .then(res=>{
            this.$vux.loading.hide();
            this.data = res.data;
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-shop-detail {
      .pic {
        img {
          width: 100%;
        }
      }
      .m-sales-count {
        color: #fff;
        margin-top:20px;
        .salesItem,.userItem {
          background: @c5;
          padding: 30px;
          margin-bottom:20px;
          ul {
            margin:0 auto;
            width: 90%;
            li {
              font-size: 28px;
              height: 80px;
              line-height: 80px;
              display: flex;
              align-items: center;
              flex-direction: row;
              .numberCont{
                flex: 1;
                display: flex;
                justify-content: flex-end;
              }
              > i {
                margin-right:20px;
                display: inline-flex;
                width: 44px;
                height: 44px;
                align-items: center;
                > img {
                  width: 100%;
                  height: 100%;
                }
              }

            }
          }

        }
        .userItem{
          .submit{
            margin:60px auto 30px;
            width: 90%;
            text-align: center;
            background: @c1;
            height: 80px;
            line-height: 80px;
            border-radius: 10px;
            font-size: 30px;
          }
          ul{
            li{
              border-bottom: 1px solid #a6a6a6;
              height: 100px;
              line-height: 100px;
              .name{
                width: 150px;
              }
              input{
                font-size: 28px;
                color:#fff;
                flex:1;
                height: 80px;
                line-height: 80px;
                background: none;
                border:none;
              }
            }
          }

        }
      }
      .m-shop-info{
        margin-bottom:30px;
        padding:30px 5px;
        background: @c5;
        .info-cont{
          padding:30px 10px;
          img{
            width: 100%;
          }
        }
      }
    }

  }
</style>
