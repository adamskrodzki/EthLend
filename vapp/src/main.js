import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import _ from "lodash";

// Todo: Update this when publishing
// import drizzleVuePlugin from '@drizzle/vue-plugin'
//
import drizzleVuePlugin from "@drizzle/vue-plugin";

Vue.use(Vuex);
Vue.use(ElementUI);
// define a mixin object
var myMixin = {
  created: function() {
    this._ = _;
  }
};

const store = new Vuex.Store({ state: {} });

if (window.ethereum) {
  Vue.use(drizzleVuePlugin, {
    store,
    drizzleOptions: {
      contracts: [],
      syncAlways: true,
      networkWhitelist: [
        1, // Mainnet
        4, // Rinkeby
        42 // Kovan
      ]
    }
  });
}
Vue.config.productionTip = false;
Vue.mixin(myMixin);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
