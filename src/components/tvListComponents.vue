<template>
  <div v-if="list" class="m-tvList-comp">
    <div class="m-line-title">
      <div>{{title}}</div>
      <div class="line-title-more"><span v-if="isMore" @click="$router.push('/tvList')"><<< 更多</span></div>
    </div>
    <div class="list">
      <div @click="tvDetail(item)" v-for="item in list" class="item">
        <img :src="`${item.column_img}`" alt="">
        <div class="item-info-text">
          <div class="title">{{item.column_title}}</div>
          <div class="date"><span>{{translateTime(item.videotime)}}</span></div>
          <div v-if="item.is_signup_over == 2" class="date"><span>报名时间 {{translateTime2(item.starttime)}}</span></div>

          <div v-if="item.is_signup_over == 0" class="tag">报名中</div>
          <div v-if="item.is_signup_over == 1" class="tag end">截 止</div>
          <div v-if="item.is_signup_over == 2" class="tag end">即将报名</div>
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
      isMore:{
        type:Boolean,
        default() {
          return true
        }
      },
      title:{
        type:String,
        default() {
          return "相关推荐"
        }
      },
      params:{
        type:Object,
        default() {
          return {
          }
        }
      },
      type:{
        type:Object,
        default() {
          return ''
        }
      }
    },
    computed:{
    },
    beforeDestroy(){
      window.removeEventListener('scroll',this.handleScroll)
    },
      mounted(){
      if(this.type === 'index'){
        this.params = {...this.params,page:1, page_size:6};
      }else{
        this.params = {...this.params,page:1, page_size:10};
      }
      window.addEventListener('scroll', this.handleScroll);
      this.loadMore();
    },
    methods: {
      translateTime2(date){
        return formatDate(date*1000,'yyyy-MM-dd hh:mm')
      },
      translateTime(date){
        return formatDate(date*1000,'yyyy-MM-dd hh:mm')
      },
      tvDetail(item){
        this.$router.push({path:'/tvDetail',query:{id:item.id,t:new Date().getTime()}})
      },
      loadMore(){
        if(this.isLock||this.isOver) return;
        if(this.type === 'index'){
          this.isOver = true;
        }
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
    margin:50px;
    margin-bottom:0;
    .list{
      padding-top:10px;
      display: flex;
      flex-wrap: wrap;
      .item-info-text{
        >div{
          height: 36px;
        }
      }
      .item{
        margin-top:20px;
        color:#fff;
        height:320px;
        position: relative;
        &:nth-child(even){
          margin-left:20px;
        }
        >img{
          width: 310px;
          height: 200px;
        }
        .tag{
          position: absolute;
          top:0;
          right:0;
          background: #3861c2;
          padding:5px;
          width: 100px;
          border-radius: 0 0 0 10px;
          text-align: center;
          &.end{
            background: #666;
          }
        }
        .date{
          color: #00daff;
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
