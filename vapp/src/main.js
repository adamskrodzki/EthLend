import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

// Todo: Update this when publishing
// import drizzleVuePlugin from '@drizzle/vue-plugin'
//
import drizzleVuePlugin from "@drizzle/vue-plugin";

Vue.use(Vuex);
const store = new Vuex.Store({ state: {} });

Vue.use(drizzleVuePlugin, { store, drizzleOptions: { contracts: [] } });

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
