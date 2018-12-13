<template>
  <div class="m-cont">
    <div class="m-head">
      <span @click="$router.go(-1)">返回</span>
    </div>
    <div class="applyPage-cont">
      <div class="m-applyPage1">
        <div class="form">
          <div class="number"><span>参加人数</span><number-count :max="1" v-model="form.num"></number-count></div>
          <!--<div class="number">
            <span>参加场次</span>
            <div class="selectedName">
              {{selectedName(selectedItem)||'请选择参加场次'}}
              <select v-model="selectedItem">
                <option selected value="">请选择参加场次</option>
                <option v-for="item in options" :value="item.value">{{item.name}}</option>
              </select>
            </div>

          </div>-->
        </div>
        <div @click="next" class="submit">
          <span>提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import NumberCount from "../components/numberCount.vue";

  export default {
    name: 'tv-detail',
    components: {NumberCount},
    data() {
      return {
        selectedItem:'',
        options:[{name:"2010-10-10",value:123},{name:"2010-10-11",value:1234},{name:"2010-10-12",value:1243}],
        form:{
          num:1,
        }

      }
    },
    computed: {

    },
    methods: {
      selectedName(evt){
        if(this.options.filter(res=>res.value == this.selectedItem)[0]){
          return this.options.filter(res=>res.value == this.selectedItem)[0].name
        }else{
          return ''
        }
      },
      init() {
//        this.$vux.loading.show();
//        this.$axios.post(this.$api.tvList.tvDetail,{id:this.$route.query.id})
//          .then(res=>{
//            this.tv = res.data.tv;
//            this.$vux.loading.hide();
//          })
//          .catch(err=>{
//            this.$vux.loading.hide();
//          })
      },
      next(){
        this.$vux.loading.show();
        this.$axios.post(this.$api.getTicket1,{column_item_id:this.$route.params.column_item_id,num:this.form.num})
          .then(res=>{
            this.$vux.loading.hide();
            this.$vux.toast.show(res.msg)
            this.$router.replace({name: '/applyPage2',params:{num:this.form.num,sign_id:res.data.sign_id}})
          })
          .catch(err=>{
            this.$vux.loading.hide();
          })
      },
    },
    mounted() {
    },
  }

</script>

<style scoped lang="less">
  @import "../assets/common";

  .m-cont {
    color: #fff;
    font-size: 24px;
    padding-bottom:150px;
    .applyPage-cont{
      height: 80vh;
      display: flex;
      align-items: center;
    }
    .submit{
      width: 100%;
      margin:0 auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom:50px;
      span{
        display: block;
        width: 500px;
        background: @c1;
        border-radius: 20px;
        height:80px;
        line-height: 80px;
      }
    }
    .m-head {
      color: #fff;
      padding: 30px;
      font-size: 32px;
    }
    .m-applyPage1 {
      color: #fff;
      font-size: 30px;
      background: @c5;
      width: 100%;
      .user{
        padding:10px 30px;
      }
      .form{
        padding: 20px 40px;
        .number{
          display: flex;
          align-items: center;
          height: 100px;
          line-height: 100px;
          span{
            margin:0 40px;
          }
          .selectedName{
            text-align: center;
            position: relative;
            min-width: 50%;
            border-bottom:1PX solid #fff;
            height: 70px;
            line-height: 70px;
            select{
              opacity: 0;
              left:0;
              top:10%;
              position: absolute;
              width: 100%;
              height: 80%;
            }
          }

        }
      }
    }
  }
</style>
