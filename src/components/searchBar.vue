<template>
  <div class="m-search">
    <form @search='search' action="">
      <input type="search" v-model="keyWord" placeholder="搜索栏目名称或主持人...">
      <img @click="search" src="../images/icon/search.png" alt="">
    </form>
  </div>
</template>

<script>
  export default {
    name: "searchBar",
    data(){
      return{
        keyWord:''
      }
    },
    methods:{
      search(){
        this.$axios.post(this.$api.tvList.componentList,{keyWord:this.keyWord})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/common";
  .m-search {
    margin: 0 auto;
    width: 600px;
    background: @c7;
    border-radius: 5px;
    position: relative;
    padding-right: 20px;
    form {
      width: 100%;
      display: flex;
      align-items: center;
      height: 66px;
      line-height: 72px;
      img {
        width: 40px;
        height: 40px;
      }
      input {
        flex: 1;
        height: 100%;
        margin-left: 30px;
        border: none;
        background: none;
        color: #fff;
        line-height: 36px;
      }
    }

  }

</style>
