<template>
  <div class="m-cont">
    <div class="m-userIndex">
      <div class="user-head">
        <img src="../images/icon/userIndex-head.png" alt="">
      </div>
      <div class="userCont">
        <div class="btns">
          <span @click="href('/login')">
            <img src="../images/icon/login-login.png" alt="">
          </span>
          <span @click="href('/register')">
               <img src="../images/icon/login-resign.png" alt="">
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'tv-detail',
    components: {},
    data() {
      return {
      }
    },
    computed: {},
    methods: {
      href(url) {
        this.$router.push({name: url})
      }
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
    .m-userIndex{
      align-items: center;
      background: url('../images/icon/login-bg.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .user-head{
        height: 600px;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .userCont{
        background-image: url('../images/icon/userIndex-border.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 750px;
        height: 750px;
        display: flex;
        align-items: center;
        justify-content: center;
        .btns{
          width: 80%;
          display: flex;
          justify-content: space-around;
          margin-top:20%;
          span{
            width: 200px;
            text-align: center;
            img{
              width: 100%;
            }
          }
        }
      }

    }
  }
</style>
