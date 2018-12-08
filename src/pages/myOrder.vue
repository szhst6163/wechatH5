<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-myCollect">
      <ul>
        <li @click="href()">
          <div class="left">
            <img src="../images/tv.jpg" alt="">
          </div>
          <div class="right">
            <div class="title">古绵纯</div>
            <div class="info">
              <div>价格￥100</div>
              <div>数量：300</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  export default {
    name: 'tv-detail',
    components: {
    },
    data() {
      return {
        collectList:[{img:defImg,title:"星光大道1",color:"#07c29a"},{img:defImg,title:"星光大道1",color:"#07c29a"},{img:defImg,title:"星光大道2",color:"#e3c75f"},{img:defImg,title:"星光大道3",color:"#e93c58"},{img:defImg,title:"星光大道4",color:"#9f74c8"}]
      }
    },
    computed: {
    },
    methods: {
      init(){
//        this.$vux.loading.show();
//        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.query.id})
//          .then(res=>{
//            this.tv = res.data.tv;
//            this.$vux.loading.hide();
//          })
//          .catch(err=>{
//            this.$vux.loading.hide();
//          })
      },
      href(data){
        this.$router.push({name:'/shopDetail',params:{data}})
      }
    },
    mounted() {
      this.init()
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    color:#fff;
    font-size: 24px;
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-myCollect{
      padding:20px;
      background: @c5;
      margin-top:20px;
      ul{
        li{
          display: flex;
          align-items: center;
          .left{
            width: 200px;
            height: 300px;
            overflow: hidden;
            img{
              width: 100%;
            }
          }
          .right{
            margin-left:30px;
            .title{
              font-size: 32px;
            }
            .info{
              margin-top:30px;
              color:@c6;
            }
          }
        }
      }
    }
  }
</style>
