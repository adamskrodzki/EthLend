<template>
  <div v-if="isDrizzleInitialized">
    You are currently on network <b>{{ networkName }}</b>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CurrentNetwork",
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),

    accounts() {
      return [this.activeAccount];
    },

    networkName() {
      if (this.networkId == 1) {
        return "Mainnet";
      }
      if (this.networkId == 4) {
        return "Rinkeby";
      }
      if (this.networkId == 42) {
        return "Kovan";
      }
      if (this.networkId == -1) {
        return "Loading...";
      }
      return `Unknown (id=${this.networkId})`;
    },

    placeholders() {
      return ["To Address", "Amount to Send"];
    }
  },
  data: () => {
    return {
      networkId: -1
    };
  },
  mounted() {
    this.drizzleInstance.web3.eth.getChainId().then(x => {
      this.networkId = x;
      this.$emit("networkFound", {
        name: this.networkName
      });
    });
  }
};
</script>

<style></style>
