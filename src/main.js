import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)



firebase.initializeApp({
    apiKey: "AIzaSyAFPu4igTYcpk2reTgV9Vhy6AUli1c_mn0",
    authDomain: "vue-vohid.firebaseapp.com",
    projectId: "vue-vohid",
    storageBucket: "vue-vohid.appspot.com",
    messagingSenderId: "299191816386",
    appId: "1:299191816386:web:9743d30ad371f3af87eb5b",
    measurementId: "G-L11HSHDM2D"
  });

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

}
})





