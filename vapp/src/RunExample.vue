<template>
  <div v-if="isDrizzleInitialized">
    <el-form :inline="true">
      <p>Smart Contract owns {{ ethOwned }} ETH of own funds</p>
      <el-form-item label="Deposit">
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
    BigNumber() {
      return this.drizzleInstance.web3.utils.BN;
    },
    weiAmount() {
      return this.drizzleInstance.web3.utils.toWei(this.ethAmount, "ether");
    },
    ethOwned() {
      return this.drizzleInstance.web3.utils.fromWei(
        this.ownEth.toString(),
        "ether"
      );
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
  methods: {
    borrow() {
      // eslint-disable-next-line
      console.log("Depositing ", this.weiAmount, "wei");
      var dep = this.drizzleInstance.contracts["ExampleCaller"].methods[
        "borrow"
      ];
      this.txIndex = dep.cacheSend(this.weiAmount);
    }
  },
  data() {
    return {
      ownEth: 0,
      ethAmount: 0,
      txIndex: -1,
      feeToPay: 0
    };
  },
  watch: {
    ethAmount() {
      var that = this;

      this.drizzleInstance.contracts.ExampleCaller.methods
        .getFee(this.weiAmount)
        .call()
        .then(x => {
          that.feeToPay = x;
        });
    }
  },
  created() {
    var that = this;

    this.drizzleInstance.contracts.ExampleCaller.methods
      .ownBalance()
      .call()
      .then(x => {
        that.ownEth = x;
      });
  }
};
</script>

<style></style>
