<template>
  <div class="m-search">
    <form @search='search' action="">
      <input type="search" placeholder="搜索栏目名称或主持人...">
      <img src="../images/icon/search.png" alt="">
    </form>
  </div>
</template>

<script>
  export default {
    name: "searchBar",
    methods:{
      search(){
        alert(1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-search {
    margin: 0 auto;
    width: 600px;
    background: #3c3e3f;
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
