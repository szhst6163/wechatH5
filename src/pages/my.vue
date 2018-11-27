<template>
  <div class="m-cont">
    <header>
      <div class="img-wrap">
        <img src="../images/icon/backIcon.png" alt="" @click="back">
      </div>
      <div class="user-info-wrap">
        <div class="author-img">
          <img src="../images/icon/dst.png" alt="">
        </div>
        <div class="user-info">
          <p class="user-name">{{ userName }}</p>
          <P class="real-name">{{ realName }}</P>
        </div>
      </div>
    </header>
    <div class="my-container-wrap">
      <div class="container" @click="link('/changePassword')">
        <img src="../images/icon/password.png" alt="" class="password">
        <span class="container-title">修改密码</span>
        <span class="link"></span>
      </div>
      <div class="container" @click="checkVersions">
        <img src="../images/icon/updateVersions.png" alt="" class="password">
        <span class="container-title">
          <span>版本更新</span>
          <span class="versions">当前版本:V{{versions}} <div v-if="point === 'true'" class="point"></div></span>
        </span>
        <span class="link"></span>
      </div>
    </div>
    <footer>
      <div @click="logoutApp" class="btn">退出登录</div>
    </footer>
  </div>
</template>

<script>
import storage from '../lib/storage'

export default {
  data() {
    return {
      userName: 'DST',
      realName: 'DST',
      versions:'',
      point:''
    }
  },
  methods: {
    checkVersions(){
      webBridge.checkUpdate();
    },
    logoutApp() {
      webBridge.logoutApp();
    },
    back() {
      this.$router.go(-1, { params: { a: 1 } })
    },
    link(url) {
      this.$router.push(url)
    },
    getVersions(){
      this.versions = webBridge.getVersionName();
      this.point = webBridge.setUpdateRedDot();
    }
  },
  mounted() {
    this.userName = storage.get('_userInfo').username
    this.realName = storage.get('_userInfo').realname
    this.getVersions();
  }
}
</script>

<style scoped lang="scss">
.m-cont {
  min-height: 100vh;
}
header {
  background-image: url("../images/myPage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 365px;
  padding: 0 24px;
  box-sizing: border-box;
  .img-wrap {
    padding-top: 64px;
    display: flex;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .user-info-wrap {
    margin: 20px 0 0 60px;
    display: flex;
    .author-img {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      background: #f4f4f4;
      border: 5px solid rgba(17, 193, 153, 0.7);
      box-sizing: content-box;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 82px;
        height: 37px;
      }
    }
    .user-info {
      padding-left: 31px;
      margin-top: 8px;
      .user-name {
        height: 53px;
        font-size: 42px;
        color: #ffffff;
        line-height: 53px;
        font-weight: 400;
      }
      .real-name {
        padding-top: 19px;
        height: 33px;
        font-size: 32px;
        color: #ffffff;
        line-height: 33px;
        font-weight: 300;
      }
    }
  }
}
.my-container-wrap {
  margin-top: 21px;
  background-color: #ffffff;
  margin-bottom: 114px;
  .container {
    height: 90px;
    display: flex;
    align-items: center;
    margin: 0 24px;
    border-bottom:1px solid #eaeaea;
    &:last-child{
      border-bottom:none;
    }
    .password {
      width: 32px;
      height: 32px;
    }
    .container-title {
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      font-weight: 300;
      color: rgba(37, 37, 37, 1);
      margin-left: 24px;
      flex: 1;
      padding-right:30px;
      .versions{
        display: flex;
        align-items: center;
        color:#666;
        .point{
          width: 10px;
          height:10px;
          background: #FF4141;
          border-radius: 100% 100%;
          margin-left: 7px;
        }
      }
    }
    .link {
      position: relative;
      &::after {
        content: " ";
        display: inline-block;
        height: 14px;
        width: 14px;
        border-width: 2px 2px 0 0;
        border-color: #444444;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        margin-top: -6px;
        right: 2px;
      }
    }
  }
}
footer {
  position: fixed;
  bottom: 24px;
  width: 100%;
  z-index: 999;
  .btn {
    width: 586px;
    height: 80px;
    line-height: 80px;
    background: linear-gradient(
      90deg,
      rgba(32, 222, 148, 1) 0%,
      rgba(13, 183, 156, 1) 100%
    );
    box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
    border-radius: 80px;
    margin: 0 auto;
    text-align: center;
    color: #ffffff;
    font-size: 30px;
  }
}
</style>
