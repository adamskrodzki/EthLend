<template>
  <div v-if="isDrizzleInitialized">
    <el-form :inline="true">
      <el-form-item label="Withdraw">
        <el-input
          placeholder="amount of TLT to burn"
          v-model="ethAmount"
        ></el-input>
      </el-form-item>
      <el-form-item>
        ETH
      </el-form-item>
      <el-form-item>
        <el-button @click="makeWithdraw" type="primary">Withdraw</el-button>
      </el-form-item>
    </el-form>

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
    makeWithdraw() {
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
      ethAmount: undefined,
      txIndex: -1
    };
  },
  created() {}
};
</script>

<style></style>
