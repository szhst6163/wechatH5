<template>
  <div class="m-common-dialog">
    <div class="marks">
      <div class="m-info">
        <div @click="close" class="close"><span>x</span></div>
        <div class="content">
          <slot></slot>
        </div>
          <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commonDialog",
    props:{
      isShow:{
        type:Boolean,
        default(){
          return true
        }
      }
    },
    methods:{
      close(){
        this.$emit("close")
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
