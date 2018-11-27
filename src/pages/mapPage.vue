<template>
  <div class="m-cont-map">
    <div class="map-head">
     <app-head :headData="1">车辆故障位置</app-head>
    </div>
    <div class="gdMap">
      <el-amap
        vid="map"
        class="amap"
        :zoom="mapOpts.zoom"
        :center="mapOpts.mapCenter"
        :plugin="mapOpts.plugin"
        :events="mapOpts.events"
      >
        <el-amap-marker :position="mapOpts.mapCenter" :offset="[-315/4,-80]">
          <div class='map-info'>
            <div class="info-bubble">
              <div>
                <p class="addressText">{{$route.params.data.mtc_a3_fault_address}}</p>
                <p>距离 <span class="green">{{myDistance}}</span> km</p>
              </div>
            </div>
            <img :src="require('../images/icon/mapPoint.png')" alt="">
          </div>
        </el-amap-marker>
      </el-amap>
      <div @click="directorDialog.show = true" class="direct">
        导航
      </div>
      <x-dialog :show="directorDialog.show">
        <div class="m-dialog-info">
          <div class="info-cont">
            <a @click="directorDialog.show = false" :href='`baidumap://map/direction?coord_type=gcj02&origin=latlng:${myPosition[1]},${myPosition[0]}|name:我的位置&destination=latlng:${mapOpts.mapCenter[1]},${mapOpts.mapCenter[0]}|name:目的地&mode=driving`'>
              <div class="mapItem">
                <img src="../images/icon/baidu.png" alt="">
                百度导航
              </div>
            </a>
            <a @click="directorDialog.show = false" :href="`amapuri://route/plan/?slat=${myPosition[1]}&slon=${myPosition[0]}&sname=我的位置&dlat=${mapOpts.mapCenter[1]}&dlon=${mapOpts.mapCenter[0]}&dname=目的地&dev=0&t=0`">
            <!--<a @click="directorDialog.show = false" :href="`${nativeType}://path?sourceApplication=adddd&sid=BGVIS1&did=BGVIS2&dlat=${mapOpts.mapCenter[1]}&dlon=${mapOpts.mapCenter[0]}&dname=目的地&dev=0&m=0&t=0`">-->
            <div class="mapItem">
              <img src="../images/icon/gaode.png" alt="">
              高德导航
            </div>
            </a>
            <div @click="directorDialog.show = false" class="cancel">取消</div>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AppHead from '../components/appHead'

export default {
  name: 'mapPage',
  components: { AppHead },
  data() {
    let self = this;
    return {
      directorDialog: {
        show: false
      },
      myPosition: [],
      myDistance: "--",
      mapOpts: {
        zoom: 12,
        mapCenter: [114.056978, 22.538184],
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.myPosition[0] = result.position.lng;
                  self.myPosition[1] = result.position.lat;
                  self.distance()
                  self.$nextTick();
                }
              });
            }
          }
        }],
        events: {
          init(o) {
            self.mapOpts.mapObj = o;
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters([]),
  },
  mounted() {
    this.init()
  },
  created() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    this.nativeType = isAndroid ? 'androidamap' : 'iosamap';
  },
  methods: {
    init() {
      let data = this.$route.params.data;
      this.mapOpts.mapCenter = [data.mtc_a3_fault_longitude * 1, data.mtc_a3_fault_latitude * 1];
    },
    distance() {
      let EARTH_RADIUS = 6378137.0;    //单位M
      let PI = Math.PI;
      let data1 = this.myPosition;
      let data2 = this.mapOpts.mapCenter;
      function getRad(d) {
        return d * PI / 180.0;
      }
      function getFlatternDistance(lat1, lng1, lat2, lng2) {
        let f = getRad((lat1 + lat2) / 2);
        let g = getRad((lat1 - lat2) / 2);
        let l = getRad((lng1 - lng2) / 2);

        let sg = Math.sin(g);
        let sl = Math.sin(l);
        let sf = Math.sin(f);

        let s, c, w, r, d, h1, h2;
        let a = EARTH_RADIUS;
        let fl = 1 / 298.257;

        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;

        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;

        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;

        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
      }
      this.myDistance = (getFlatternDistance(data1[1], data1[0], data2[1], data2[0]) / 1000).toFixed(1)
    }
  }
}

</script>

<style lang="less">
.m-cont-map {
  height: 100vh;
  width: 100vw;
  .map-head {
    height: 0;
  }
  .map-info {
    /*position: absolute;
      left:-315/2px;
      bottom:(109/2)-63*2px;*/
    text-align: center;
    >img{
      width: 58/2PX;
      height: 63/2PX;
    }
    .info-bubble {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: left;
      background: #fff;
      width: 329/2PX;
      height: 122/2PX;
      line-height: 38/2PX;
      background: url("../images/icon/mapInfoBorder.png");
      background-size: 100% 100%;
      background-position-y: 2PX;
      background-repeat: no-repeat;
      box-sizing: border-box;
      .addressText{
        max-width: 288/2PX;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .green{
        color:#19C280;
      }
    }
  }
  .gdMap {
    height: 100%;
    width: 100%;
    position: relative;
    .amap-geolocation-con {
      bottom: 140px !important;
      z-index: 999 !important;
    }
    .direct {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 98px;
      background: linear-gradient(
        90deg,
        rgba(32, 222, 148, 1) 0%,
        rgba(13, 184, 156, 1) 100%
      );
      text-align: center;
      line-height: 98px;
      color: #fff;
      z-index: 999;
      font-size: 32px;
    }
  }
  .weui-dialog {
    border-radius: 21px;
    max-width: none;
    width: 84%;
    .m-dialog-info {
      color: #252525;
      width: 630px;
      display: inherit;
      border: none;
      .info-cont {
        min-height: 50px;
        padding: 0 !important;
        .mapItem {
          color: #252525;
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 115px;
          border-bottom: 1px solid #eaeaea;
          img {
            width: 50px;
            height: 50px;
            margin-right: 16px;
          }
        }
        a:last-child {
          .mapItem {
            border-bottom: 0;
          }
        }
      }
      .cancel {
        margin-bottom: -2px;
        height: 87px;
        line-height: 87px;
        font-size: 30px;
        color: #fff;
        background: #ccc;
        border-radius: 0px 0px 21px 21px;
      }
    }
  }
}
</style>
