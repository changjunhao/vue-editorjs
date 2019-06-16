import Vue from 'vue'
import App from './app.vue'
import Editor from '../src'

Vue.use(Editor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
