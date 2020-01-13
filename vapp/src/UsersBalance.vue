<template>
  <div>
    <div v-if="isDrizzleInitialized">
      Your balance is <b>{{ totalBalance }}</b> ETH staked in
      <a v-bind:href="totalUrl" target="_blank">ETHLend contract</a>
    </div>
    <div v-if="isDrizzleInitialized">
      Your have <b>{{ totalTokenBalance }}</b> TxLend Tokens
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserBalance",
  props: ["blockExpUrl", "activeAccount"],
  computed: {
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
      if (this.balance === "loading") {
        return "Loading...";
      } else {
        return this.drizzleInstance.web3.utils.fromWei(
          this.balance.toString(),
          "ether"
        );
      }
    },

    totalTokenBalance() {
      if (this.tokenBalance === "loading") {
        return "Loading...";
      } else {
        return this.drizzleInstance.web3.utils.fromWei(
          this.tokenBalance.toString(),
          "ether"
        );
      }
    },
    balance() {
      var value = this.getContractData({
        contract: "TxLendToken",
        method: "getUsersBalance"
      });
      return value;
    },
    tokenBalance() {
      var value = this.getContractData({
        contract: "TxLendToken",
        method: "balanceOf"
      });
      return value;
    }
  },
  watch: {
    activeAccount: function() {
      this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "TxLendToken",
        method: "getUsersBalance",
        methodArgs: [this.activeAccount]
      });
      this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "TxLendToken",
        method: "balanceOf",
        methodArgs: [this.activeAccount]
      });
    }
  },
  data: () => {
    return {
      counter: 0
    };
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "TxLendToken",
      method: "getUsersBalance",
      methodArgs: [this.activeAccount]
    });
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "TxLendToken",
      method: "balanceOf",
      methodArgs: [this.activeAccount]
    });
  }
};
</script>

<style></style>
