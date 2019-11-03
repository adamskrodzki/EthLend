<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Show the Accounts</h2>
      <drizzle-account units="Ether" :precision="2" />
    </div>

    <div class="section">
      <h2>Tutorial Token</h2>
      <TutorialToken />
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import TutorialToken from "./TutorialToken";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    TutorialToken
  },

  computed: mapGetters("drizzle", ["isDrizzleInitialized"]),
  mounted: function() {
    // eslint-disable-next-line
    console.log("mounting works");
    this.$drizzleEvents.$on("drizzle/contractEvent", payload => {
      // eslint-disable-next-line
      console.log("event catched", payload);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
