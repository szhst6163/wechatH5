<template>
    <div class="m-search">
      <input type="text"  placeholder="搜索栏目名称或主持人...">
      <i></i>
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
    height: 72px;
    line-height: 72px;
    background: #3c3e3f;
    border-radius: 5px;
    position: relative;
    display: flex;
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
