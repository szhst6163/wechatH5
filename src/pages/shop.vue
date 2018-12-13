<template>
  <div class="m-cont">
    <web-head :active="2"></web-head>
    <div class="m-head">
      <search-bar></search-bar>
    </div>
    <div class="m-shop">
      <div class="shopList">
        <div class="m-line-title">商品推荐</div>
        <div class="list">
          <div @click="detail(item)" v-for="item in shopList" class="item">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="title">{{item.name}}</div>
            <div class="price">
              <div>￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'

  export default {
    name: 'shop',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        shopList:[]
      }
    },
    watch: {},
    created() {
    },
    computed: {},
    mounted() {
      this.init()
    },
    methods: {
      detail(item){
        this.$router.push({path: '/shopDetail',query:item})
      },
      init(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.shop.getList)
          .then(res=>{
            this.$vux.loading.hide();
            this.shopList = res.data;
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
    }
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    .m-head {
      padding-bottom: 30px;
      background: @c5;
    }
    .m-shop {
      margin-top: 20px;
      background: @c5;
      .shopList {
        color: #fff;
        padding: 20px;
        .list {
          padding-top:30px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .item {
            overflow: hidden;
            width: 48.5%;
            margin-bottom:20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .img {
              flex:1;
              width: 100%;
              height: 300px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .title {
              margin-bottom: 5px;
            }
            .price {
              color: @c1;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
