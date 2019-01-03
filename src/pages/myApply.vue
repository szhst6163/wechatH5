<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-myCollect">
      <ul v-if="list.length">
        <li @click="href('/tvDetail',item)" v-for="item in list">
          <div class="left">
            <img :src="item.column_image" alt="">
          </div>
          <div class="right">
            <div class="title">《{{item.column_name}}》</div>
            <div class="info">
              <div>报名于 {{formatTime(item.intime)}}</div>
              <div>地址： {{item.address}}</div>
              <div v-if="item.status == 1 && item.is_outoftime == 0" @click.stop="href2('/applyPage1',item)" class="status"><div>继续报名</div></div>
              <div v-if="item.status == 2" @click.stop="href2('/applySuc',item)" class="status"><div>报名成功</div></div>
              <div v-if="item.status == 4" @click.stop="failTips(item.status)" class="status"><div>已取消</div></div>
              <div v-if="item.status == 1 && item.is_outoftime == 1" @click.stop="failTips(item.status)" class="status"><div>报名超时</div></div>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="!list.length" class="noData">
        暂无数据...
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import formatDate from "../lib/formatDate";
  export default {
    name: 'tv-detail',
    components: {
    },
    data() {
      return {
        list:[],
        isLock:false,
        isOver:false,
        params:{page:1, page_size:10}
      }
    },
    computed: {
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.handleScroll)
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
      this.loadMore();
    },
    methods: {
      formatTime(date){
        return formatDate(date)
      },
      failTips(type){
        if(type === 4){
          this.$vux.toast.show('由于在电话审核时，报名人自愿放弃报名。');
        }else{
          this.$vux.toast.show('由于报名人未在15分钟内完善观看人资料，自动作废。');
        }
      },
      status(data){
        let map = {1:"报名中",2:"成功",3:"失败"};
        return map[data]
      },
      loadMore(){
        if(this.isLock||this.isOver) return;
        this.isLock = true;
        this.$axios.post(this.$api.mysignup,this.params)
          .then(res=>{
            this.isLock = false;
            if(res.data.length < this.params.page_size){this.isOver = true;}
            this.params.page++;
            this.list = this.list.concat(res.data);
            this.$vux.loading.hide();
          })
          .catch(err=>{
            this.isLock = false;
            this.$vux.loading.hide();
          })
      },
      handleScroll(evt){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let height = window.document.body.offsetHeight;
        if(height-scrollTop-window.innerHeight <=50){
          this.loadMore();
        }
      },
      href(url,data){
        this.$router.push({path:url,query:{id:data.column_item_id}})
      },
      href2(url,data){
        this.$router.push({path:url,query:{id:data.column_item_id,sign_id:data.id}})
      },
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
    .noData{
      margin-top:200px;
      text-align: center;
    }
    .m-myCollect{
      ul{
        li{
          padding:20px;
          margin-top:20px;
          background: @c8;
          display: flex;
          align-items: center;
          .left{
            width: 200px;
            height: 300px;
            overflow: hidden;
            display: flex;
            align-items: center;
            img{
              width: 100%;
            }
          }
          .right{
            flex:1;
            margin-left:30px;
            .title{
              font-size: 32px;
            }
            .info{
              margin-top:30px;
              color:@c6;
              .status{
                padding-right: 20px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                >div{
                  padding:10px 30px;
                  background:@c1;
                  color:#fff;
                  border-radius:20px;
                }
              }
          }
          }
        }
      }
    }
  }
</style>
