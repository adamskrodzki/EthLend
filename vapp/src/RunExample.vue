<template>
  <div v-if="isDrizzleInitialized">
    <el-form :inline="true">
      <p>Smart Contract owns {{ ethOwned }} ETH of own funds</p>
      <el-form-item label="Borrow">
        <el-input placeholder="amount to borrow" v-model="ethAmount"></el-input>
      </el-form-item>
      <el-form-item>
        ETH
      </el-form-item>
      <el-form-item>
        <el-button @click="borrow" type="primary">Borrow</el-button>
      </el-form-item>
      <p>
        That will force Smart Contract to return {{ totalToRepay }} ETH or
        transaction will fail
      </p>
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
    ...mapGetters("contracts", ["contractInstances"]),
    BigNumber() {
      return this.drizzleInstance.web3.utils.BN;
    },
    weiAmount() {
      try {
        return this.drizzleInstance.web3.utils.toWei(
          this.ethAmount.toString(),
          "ether"
        );
      } catch (e) {
        return 0;
      }
    },
    ethOwned() {
      if (!this.ownEth) {
        return "";
      }
      return this.drizzleInstance.web3.utils.fromWei(
        this.ownEth.toString(),
        "ether"
      );
    },
    ownEth() {
      try {
        return this.contractInstances.ExampleCaller.ownBalance[
          this.ownBalanceKey
        ].value;
      } catch (e) {
        return 0;
      }
    },
    feeToPay() {
      try {
        return this.contractInstances.ExampleCaller.getFee[this.feeKey].value;
      } catch (e) {
        return 0;
      }
    },
    totalToRepay() {
      try {
        const toBorrow = new this.BigNumber(
          this.drizzleInstance.web3.utils.toWei(
            this.ethAmount.toString(),
            "ether"
          )
        );

        const fee = this.feeToPay
          ? new this.BigNumber(this.feeToPay.toString())
          : new this.BigNumber("0");
        const total = toBorrow.add(fee);
        return this.drizzleInstance.web3.utils.fromWei(total, "ether");
      } catch (ex) {
        return 0;
      }
    }
  },
  watch: {
    ethAmount() {
      const key = this.drizzleInstance.contracts.ExampleCaller.methods.getFee.cacheCall(
        this.weiAmount
      );
      this.feeKey = key;
    }
  },
  created() {
    const key = this.drizzleInstance.contracts.ExampleCaller.methods.ownBalance.cacheCall();
    this.ownBalanceKey = key;
  },
  methods: {
    borrow() {
      var dep = this.drizzleInstance.contracts.ExampleCaller.methods.borrow;
      this.txIndex = dep.cacheSend(this.weiAmount);
    }
  },
  data() {
    return {
      ethAmount: 0,
      txIndex: -1
    };
  }
};
</script>

<style></style>
