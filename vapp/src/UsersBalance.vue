<template>
  <div>
    <div v-if="isDrizzleInitialized">
      Your balance is <b>{{ totalBalance }}</b> ETH staked in
      <a v-bind:href="totalUrl" target="_blank">TxLendToken contract</a>
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
    ...mapGetters("contracts", ["contractInstances"]),

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
      try {
        const val = this.contractInstances.TxLendToken.getUsersBalance[
          this.userBalanceKey
        ].value;
        return val;
      } catch (e) {
        return 0;
      }
    },
    tokenBalance() {
      try {
        return this.contractInstances.TxLendToken.balanceOf[
          this.balanceOfUserKey
        ].value;
      } catch (e) {
        return 0;
      }
    }
  },
  watch: {
    activeAccount() {
      this.userBalanceKey = this.drizzleInstance.contracts.TxLendToken.methods.getUsersBalance.cacheCall(
        this.activeAccount
      );
      this.balanceOfUserKey = this.drizzleInstance.contracts.TxLendToken.methods.balanceOf.cacheCall(
        this.activeAccount
      );
    }
  },
  data: () => {
    return {
      counter: 0
    };
  },
  created() {
    this.userBalanceKey = this.drizzleInstance.contracts.TxLendToken.methods.getUsersBalance.cacheCall(
      this.activeAccount
    );
    this.balanceOfUserKey = this.drizzleInstance.contracts.TxLendToken.methods.balanceOf.cacheCall(
      this.activeAccount
    );
  }
};
</script>

<style></style>
