<template>
  <div>
    <div v-if="isDrizzleInitialized" id="app">
      <div class="section">
        <CurrentNetwork v-on:networkFound="setupNetwork" />
      </div>
      <div class="section">
        <IncorrectNetworkInfo v-if="supportedNetwork == false" />
      </div>
      <div class="section" v-if="supportedNetwork">
        <ContractBalance v-bind:blockExpUrl="etherscanUrl" />
      </div>
      <div class="section" v-if="supportedNetwork">
        <DepositETH v-bind:blockExpUrl="etherscanUrl" />
      </div>
      <div class="section" v-if="supportedNetwork">
        <UsersBalance v-bind:blockExpUrl="etherscanUrl" />
      </div>
      <div class="section" v-if="supportedNetwork">
        <WithdrawEth v-bind:blockExpUrl="etherscanUrl" />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import CurrentNetwork from "./CurrentNetwork";
import ContractBalance from "./ContractBalance";
import IncorrectNetworkInfo from "./IncorrectNetworkInfo";
import DepositETH from "./DepositETH";
import UsersBalance from "./UsersBalance";
import WithdrawEth from "./WithdrawETH";
import { mapGetters } from "vuex";
import TxLendToken from "./contracts/TxLendToken.json";
import options from "./drizzleOptions";

export default {
  name: "app",
  components: {
    CurrentNetwork,
    ContractBalance,
    DepositETH,
    UsersBalance,
    WithdrawEth,
    IncorrectNetworkInfo
  },
  watch: {
    activeAccount(prevVal, newVal) {
      // eslint-disable-next-line
      console.log("Values", prevVal, newVal);
    }
  },

  methods: {
    setupNetwork(event) {
      // eslint-disable-next-line
      console.log("Setting up network", event.name);
      if (event.name == "Rinkeby" || event.name == "Kovan") {
        //TODO Add Contract on suppported network

        this.drizzleInstance.addContract(
          TxLendToken,
          options.events["TxLendToken"]
        );
        this.supportedNetwork = true;
      }
      if (event.name == "Rinkeby") {
        this.etherscanUrl = "https://rinkeby.etherscan.io/address/";
      }
      if (event.name == "Kovan") {
        this.etherscanUrl = "https://kovan.etherscan.io/address/";
      }
    }
  },

  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount", "activeBalance"])
  },
  mounted: function() {
    // eslint-disable-next-line
    console.log("mounting works");
    this.$drizzleEvents.$on("drizzle/contractEvent", payload => {
      // eslint-disable-next-line
      console.log("event catched", payload);
    });
  },
  data() {
    return {
      etherscanUrl: "invalid",
      supportedNetwork: false
    };
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
