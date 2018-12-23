<template>
  <div class="m-cont">
    <web-head :active="1"></web-head>
    <div class="m-classify">
      <div @click="getChance" class="getChance">
        兑换报名机会
      </div>
      <search-bar></search-bar>
      <div class="tvType">
        <div @click="tvcloums(item)" v-for="item in tv" class="tvItem">
          <div class="name1">{{item.name}}</div>
          <div class="name2">{{item.introduce}}</div>
        </div>
      </div>
    </div>
    <div class="m-hot-tv">
      <div class="m-line-title">热门栏目</div>
      <div class="funList">
        <div @click="tvDetail(item)" v-for="item in hotcolumn" class="item">
          <div class="img"><img :src="item.icon||defImg" alt=""></div>
          <div>{{item.column_title}}</div>
        </div>
      </div>
    </div>
    <tv-list-components class="m-tvList"></tv-list-components>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import WebHead from '../components/webHead';
  import SearchBar from "../components/searchBar";
  import TvListComponents from "../components/tvListComponents.vue";
  import defImg from '../images/icon/baoming.png'
  export default {
    name: 'tv-list',
    components: {
      TvListComponents,
      SearchBar,
      WebHead,
    },
    data() {
      return {
        tv:[],
        defImg,
        hotcolumn:[]
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      tvDetail(item){
        this.$router.push({path:'/tvDetail',query:{id:item.id,t:new Date().getTime()}})
      },
      init(){
        this.$vux.loading.show();
        Promise.all([this.$axios.post(this.$api.tvList.index,{code:this.code}),this.$axios.post(this.$api.tvList.componentList,{ishot:2})])
          .then(res=>{
            this.tv = res[0].data.tv;
            this.hotcolumn = res[1].data;
            this.$vux.loading.hide();
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
      tvcloums(data){
        this.$router.push({name:"/tvcloums",params:{tv_id:data.id}})
      },
      getChance(data){
        this.$router.push({name:"/getChance",params:{tv_id:data.id}})
      }
    },
    mounted() {
      this.init()
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
    .m-swiper{
      height:410px;
    }
    .m-hot-tv{
      padding:20px 10px;
      padding-bottom:0;
      margin-top:20px;
      background: @c5;
      .funList{
        display: flex;
        flex-wrap: wrap;
        margin-top:40px;
        .item{
          margin-bottom:20px;
          color:#fff;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 25%;
          .img{
            width: 90px;
            height:90px;
            border-radius: 10px;
            padding:10px;
            margin-bottom:10px;
            box-sizing: border-box;
            >img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .m-classify{
      padding:30px 0;
      background: @c5;
      .getChance{
        text-align: center;
        width: 620px;
        height: 80px;
        line-height: 80px;
        margin:0 auto 30px;
        background: @c7;
        color: @c2;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 30px;

      }
      .tvType{
        color:#fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:20px 20px;
        padding-bottom:0;
        .tvItem{
          background: @c1;
          box-sizing: border-box;
          padding:30px 20px;
          margin-top:20px;
          width: 344px;
          height:200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 10px;
          .name1{
            font-size: 32px;
          }
          .name2{
            font-size: 24px;
          }
        }
      }
    }
    .m-tvList{
      margin-top:20px;
      padding:30px 10px;
      background: @c5;
    }
  }
</style>
