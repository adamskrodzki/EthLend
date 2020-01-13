import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import ElementUI from "element-ui";

// Todo: Update this when publishing
// import drizzleVuePlugin from '@drizzle/vue-plugin'
//
import drizzleVuePlugin from "@drizzle/vue-plugin";

Vue.use(Vuex);
Vue.use(ElementUI);
const store = new Vuex.Store({ state: {} });

if (window.ethereum) {
  Vue.use(drizzleVuePlugin, { store, drizzleOptions: { contracts: [] } });
}
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
