import Vue from 'vue'
import { Bar, Line } from 'vue-chartjs/legacy'
// let Bar = require('vue-chartjs/legacy');


Vue.component('line-chart', {
    extends: Line,
    props: ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
})

Vue.component('Bar', {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
      // this.renderChart(this.data, this.options)
  }
})



