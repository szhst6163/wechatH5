<template>
    <div class="m-search">
      <input type="search" placeholder="搜索栏目名称或主持人...">
      <img src="../images/icon/search.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "searchBar"
    }
</script>

<style lang="less" scoped>
  .m-search{
    margin:0 auto;
    width: 600px;
    height: 66px;
    line-height: 72px;
    background: #3c3e3f;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    padding-right:20px;
    >img{
      width: 40px;
      height:40px;
    }
    >input{
      flex:1;
      height: 100%;
      margin-left:30px;
      border: none;
      background: none;
      color: #fff;
      line-height: 36px;
    }
  }

</style>
