<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="m-myCollect">
      <ul v-if="list.length">
        <li @click="href(item)" v-for="item in list">
          <div class="left">
            <img :src="item.column_img" alt="">
          </div>
          <div class="right">
            <div class="title">《{{item.name}}》</div>
            <div class="info">
              <div>报名于 {{formatTime(item.intime)}}</div>
              <div>地址： {{item.address}}</div>
              <div class="status">{{status(item.status)}}</div>
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
      status(data){
        let map = {1:"报名中",2:"成功",3:"失败"}
        return map[data]
      },
      loadMore(){
        if(this.isLock||this.isOver) return;
        this.isLock = true;
        this.$axios.post(this.$api.myorder,this.params)
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
      href(data){
        this.$router.push({path:'/tvDetail',query:{id:data.id}})
      }
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
          background: @c5;
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
                font-size: 30px;
                color:@c1;
              }
          }
          }
        }
      }
    }
  }
</style>
