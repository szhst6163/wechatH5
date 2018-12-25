<template>
  <div class="m-tvList-comp">
    <div class="m-line-title">
      {{title}}
    </div>
    <div class="list">
      <div @click="tvDetail(item)" v-for="item in list" class="item">
        <img :src="`${item.column_img}`" alt="">
        <div>
          <div class="title">{{item.column_title}}</div>
          <div class="date">{{translateTime(item.starttime)}}</div>
          <div v-if="item.is_signup_over == 0" class="tag">报 名</div>
          <div v-if="item.is_signup_over == 1" class="tag end">截 止</div>
        </div>
      </div>
    </div>
    <div class="noData" v-if="!list.length">暂无数据</div>
    <div class="noData" v-if="isLock">加载中...</div>
  </div>
</template>

<script>
  import formatDate from "../lib/formatDate";
  import clone from '../lib/json/clone'
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'tv-list-components',
    data(){
      return {
        list:[],

        isLock:false,
        isOver:false
      }
    },
    props: {
      title:{
        type:String,
        default() {
          return "栏目报名推荐"
        }
      },
      params:{
        type:Object,
        default() {
          return {
          }
        }
      }
    },
    computed:{
      ...mapGetters(['getTvInfo'])
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.handleScroll)
    },
      mounted(){
      this.params = {...this.params,page:1, page_size:10};
      window.addEventListener('scroll', this.handleScroll);
      this.loadMore();
    },
    methods: {
      ...mapMutations(['setTvInfo']),
      translateTime(date){
        return formatDate(date*1000,'yyyy-MM-dd')
      },
      tvDetail(item){
        this.setTvInfo({name:'info',data:item});
        console.log(this.getTvInfo)
        this.$router.push({path:'/tvDetail',query:{id:item.id,t:new Date().getTime()}})
      },
      loadMore(){
        if(this.isLock||this.isOver) return;
        this.isLock = true;
        this.$axios.post(this.$api.tvList.componentList,this.params)
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
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";
  .m-tvList-comp{
    .list{
      padding-top:10px;
      display: flex;
      flex-wrap: wrap;
      .item{
        margin-left:2.5%;
        margin-top:20px;
        color:#fff;
        width: 30%;
        height:410px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tag{
          position: absolute;
          top:0;
          right:0;
          background: @c1;
          padding:5px;
          width: 100px;
          border-radius: 0 0 0 10px;
          text-align: center;
          &.end{
            background: #666;
          }
        }
        .title{
          margin-left:10px;
        }
        .date{
          margin-left: 10px;
        }
        img{
          flex:1;
          width: 100%;
        }
      }
    }
    .noData{
      padding:30px;
      text-align: center;
      color:#fff;
    }
  }
</style>
