import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Routes from './routes' //importerar filen med alla routes

Vue.use(VueResource); //för att kunna göra HTTP-requests på ett smidigt sätt
Vue.use(VueRouter); //för att kunna göra routes och ha olika sidor på samma index

const router = new VueRouter({
  routes: Routes, //Routes är det vi importerade längre upp, man hade kunnat lägga dem direkt här men det är mer organiserat att ha en egen fil
  mode: 'history' //funkar bara i den locala servern provided by vue, tar bort '#'
});






new Vue({ //den här skickar hela appen till index.html
  el: '#app',
  render: h => h(App),
  router: router //router kommer från "const router = new VueRouter" längre upp, gör så att vi kan använda våra routes i vår vue instance i index.html
})
