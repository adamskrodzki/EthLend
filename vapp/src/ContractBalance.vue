<template>
  <div>
    <div v-if="isDrizzleInitialized">
      There is currently <b>{{ totalBalance }}</b> ETH staked in
      <a v-bind:href="totalUrl" target="_blank">ETHLend contract</a>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContractBalance",
  props: ["blockExpUrl"],
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("contracts", ["getContractData"]),

    accounts() {
      return [this.activeAccount];
    },
    totalUrl() {
      return (
        this.blockExpUrl + this.drizzleInstance.contracts["TxLendToken"].address
      );
    },

    totalBalance() {
      if (this.balance == "loading") {
        return "Loading...";
      } else {
        return this.drizzleInstance.web3.utils.fromWei(
          this.balance.toString(),
          "ether"
        );
      }
    },
    balance() {
      var value = this.getContractData({
        contract: "TxLendToken",
        method: "getBalance"
      });
      return value;
    },

    placeholders() {
      return ["To Address", "Amount to Send"];
    }
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "TxLendToken",
      method: "getBalance",
      methodArgs: []
    });
  }
};
</script>

<style></style>
