<template>
  <div class="m-search">
    <form @search='search' action="">
      <input type="search" v-model="keywords" placeholder="搜索栏目名称或主持人...">
      <img @click="search" src="../images/icon/search.png" alt="">
    </form>
  </div>
</template>

<script>
  export default {
    name: "searchBar",
    data(){
      return{
        keywords:''
      }
    },
    methods:{
      search(){
        if(!this.keywords){
          this.$vux.toast.show("请输入关键字");
          return;
        }
        this.$router.push({path:'/searchResult',query:{keywords:this.keywords}})

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";
  .m-search {
    margin: 0 auto;
    width: 600px;
    background: rgba(255,255,255,.3);
    border-radius: 100px;
    position: relative;
    padding-right: 20px;
    form {
      width: 100%;
      display: flex;
      align-items: center;
      height: 66px;
      line-height: 72px;
      img {
        width: 46px;
        height: 37px;
      }
      input {
        flex: 1;
        height: 100%;
        margin-left: 30px;
        border: none;
        background: none;
        color: #fff;
        line-height: 36px;
        &::-webkit-input-placeholder { /* WebKit browsers */
          color: #fff;
        }
      }
    }

  }

</style>
