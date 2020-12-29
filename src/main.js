import Vue from 'vue'
import Terminal from './Terminal.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Terminal),
}).$mount('#terminal')
