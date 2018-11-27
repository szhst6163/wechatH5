<template>
    <picker :data='showData' v-model='date'></picker>
</template>


<script>
import { Picker } from 'vux'
export default {
  name: 'pickerModule',
  components: {
    Picker,
  },
  props: {
    showData: {
      type: Array,
      default: () => []
    },
    date: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  },
}
</script>
