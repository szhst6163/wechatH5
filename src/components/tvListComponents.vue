<template>
  <div class="m-tvList-comp">
    <div class="m-title">
      {{title}}
    </div>
    <div class="list">
      <div v-for="item in list" class="item">
        <img src="../images/tv.jpg" alt="">
        <div class="title">{{item.title}}</div>
        <div class="date">{{item.date}}</div>
        <div v-if="item.status == 1" class="tag">报 名</div>
        <div v-if="item.status == 0" class="tag end">截 止</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'tv-list-components',
    data(){
      return {
        list:[{title:"精英汇",date:"2018.12.12",status:1},{title:"精英汇",date:"2018.12.12",status:1},{title:"精英汇",date:"2018.12.12",status:1},{title:"精英汇",date:"2018.12.12",status:1},{title:"精英汇",date:"2018.12.12",status:0},{title:"精英汇",date:"2018.12.12",status:0}]
      }
    },
    props: {
      title:{
        type:String,
        default() {
          return "栏目报名推荐"
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";
  .m-tvList-comp{
    .m-title{
      height:38px;
      line-height: 38px;
      display: flex;
      align-items: center;
      font-size: 36px;
      color:#fff;
      &:before{
        content: '';
        display: inline-block;
        height: 100%;
        width: 4px;
        margin-right:20px;
        background: @c1;
      }
    }
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
          width: 100%;
        }
      }
    }
  }
</style>
