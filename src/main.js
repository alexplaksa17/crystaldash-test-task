import Vue from 'vue'
import App from './App.vue'
import DataTable from './components/DataTable'
import Cell from './components/Cell'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
