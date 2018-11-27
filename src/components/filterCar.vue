<template>
  <div class="m-filter-cont">
    <div class="m-filterCar">
      <div class="tags">
        <div @click="showPicker(1)" class="item">
          <div class="text">品牌</div>
          <img src="../images/icon/arrow_down.png" alt="">
        </div>
        <div class="item">
          <div @click="showPicker(2)"  class="text">价格</div>
          <img src="../images/icon/arrow_down.png" alt="">
        </div>
        <div @click="showPicker(3)"  class="item">
          <div class="text">类型</div>
          <img src="../images/icon/arrow_down.png" alt="">
        </div>
      </div>
    </div>
    <div v-if="showTags" class="filterTag">
      <div @click="clearTag('carBrandId')" v-if="searchData.carBrandId" class="tagItem">
        <span class="tagText">{{opts.options1.filter(res=>res.value == searchData.carBrandId)[0].name}}</span>
        <img src="../images/icon/close.png" alt="">
      </div>
      <div @click="clearTag('priceSortType')" v-if="searchData.priceSortType" class="tagItem">
        <span class="tagText">{{opts.options2.filter(res=>res.value == searchData.priceSortType)[0].name}}</span>
        <img src="../images/icon/close.png" alt="">
      </div>
      <div @click="clearTag('carKind')" v-if="searchData.carKind" class="tagItem">
        <span class="tagText">{{opts.options3.filter(res=>res.value == searchData.carKind)[0].name}}</span>
        <img src="../images/icon/close.png" alt="">
      </div>
    </div>
    <filter-picker @change="change" :options="[opts.options1]" v-model="searchData.carBrandId" ref="picker1"><div class="pickerTitle" slot="title"><img src="../images/icon/feeInfo.png" alt="">车辆品牌</div></filter-picker>
    <filter-picker @change="change" :options="[opts.options2]" v-model="searchData.priceSortType" ref="picker2"><div class="pickerTitle" slot="title"><img src="../images/icon/priceFilter.png" alt="">价格高低</div></filter-picker>
    <filter-picker @change="change" :options="[opts.options3]" v-model="searchData.carKind" ref="picker3"><div class="pickerTitle" slot="title"><img src="../images/icon/carFilter.png" alt="">汽车类型</div></filter-picker>
  </div>
</template>

<script>
  import FilterPicker from "./filterPicker";

  export default {
    components: {FilterPicker},
    name: "filter-car",
    props:{
      opts:{
        type:Array,
        default(){
          return{
            options1:[],
            options2:[],
            options3:[]
          }
        }
      },
      searchData:{
        type:Object,
        default(){
          return{
            carBrandId:null,
            priceSortType:null,
            carKind:null,
          }
        }
      }
    },
    data(){
      return {
      }
    },
    computed:{
      showTags(){
        if(this.searchData.carBrandId||this.searchData.priceSortType||this.searchData.carKind){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      clearTag(type){
        this.searchData[type] = "";
        this.$emit("search",this.searchData)
      },
      change(evt){
        this.$emit("search",this.searchData)
      },
      showPicker(evt) {
        this.$refs[`picker${evt}`].show();
      },
    }
  }
</script>

<style lang="less" scoped>
  .m-filter-cont{
    .pickerTitle{
      font-size: 32px;
      height: 88px;
      line-height: 88px;
      display: flex;
      align-items: center;
      color:#252525;
      img{
        margin-right: 24px;
        width: 32px;
        height: 32px;
      }
    }
    .m-filterCar{
      color:#000;
      background: #fff;
      position: fixed;
      top: 88px;
      width: 100%;
      z-index: 9;
      height: 100px;
      .tags{
        padding:0 24px;
        display: flex;
        justify-content: space-between;
        height: 100px;
        .item{
          display: flex;
          align-items: center;
          font-size: 28px;
          img{
            width: 20px;
            height: 20px;
            margin-left:10px;
            vertical-align: middle;
            margin-top:-10px;
          }
        }
      }
    }
    .filterTag{
      height: 100px;
      line-height: 100px;
      padding:0 24px;
      display: flex;
      align-items: center;
      .tagItem{
        padding: 10px;
        border: 1PX solid #19C280;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        margin-right:30px;
        max-width: 27%;
        .tagText{
          max-width: 196px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img{
          width: 22px;
          height: 22px;
          margin-left:10px;
        }
      }
    }
  }
</style>
