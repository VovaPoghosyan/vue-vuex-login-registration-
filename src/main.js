import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import { store } from './store/store'
import ImageUploader from "vue-image-upload-resize";

Vue.use(ImageUploader);

Vue.config.productionTip = false
sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
