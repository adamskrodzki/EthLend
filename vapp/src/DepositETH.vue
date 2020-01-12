<template>
  <div v-if="isDrizzleInitialized">
    <input v-model="ethAmount" placeholder="amount to deposit" /> ETH
    <button v-on:click="makeDeposit">Deposit</button>
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
      console.log("Depositing ", this.weiAmount, "wei");
      var dep = this.drizzleInstance.contracts["TxLendToken"].methods[
        "deposit"
      ];
      this.txIndex = dep.cacheSend({ value: this.weiAmount });

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
