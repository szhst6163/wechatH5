<template>
  <div class="m-cont">
    <web-head :active="1"></web-head>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import WebHead from "../components/webHead.vue";

export default {
  name: 'tvList',
  components: {
    WebHead
  },
  data() {
    return {
    }
  },
  watch: {
  },
  created() {
  },
  computed: {
  },
  mounted() {
  },
  methods:{}
}

</script>

<style scoped lang="less">
  @import "../assets/common";
  .m-cont{
  }
</style>
