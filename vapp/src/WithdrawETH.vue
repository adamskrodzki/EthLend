<template>
  <div v-if="isDrizzleInitialized">
    <input v-model="ethAmount" placeholder="amount of TLT to burn" /> ETH
    <button v-on:click="makeDeposit">Withdraw</button>
    <TxStatus v-bind:blockExpUrl="blockExpUrl" v-bind:txIndex="txIndex" />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";
import TxStatus from "./TxStatus";

export default {
  name: "ContractBalance",
  props: ["blockExpUrl"],
  components: { TxStatus },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("contracts", ["getContractData"]),
    weiAmount() {
      return this.drizzleInstance.web3.utils.toWei(this.ethAmount, "ether");
    }
  },
  methods: {
    makeDeposit() {
      // eslint-disable-next-line
      console.log("Withdrawing ", this.weiAmount, "wei");
      var dep = this.drizzleInstance.contracts["TxLendToken"].methods[
        "withdraw"
      ];
      this.txIndex = dep.cacheSend(this.weiAmount);

      // eslint-disable-next-line
      console.log("Tx index ", this.txIndex);
    }
  },
  data() {
    return {
      ethAmount: 0,
      txIndex: -1
    };
  },
  created() {}
};
</script>

<style></style>
