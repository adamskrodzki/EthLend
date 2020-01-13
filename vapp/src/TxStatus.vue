<template>
  <div v-if="isDrizzleInitialized">
    <div v-if="isVisible">
      transaction
      <a v-if="txHash !== '.....'" v-bind:href="totalUrl" target="_blank">{{
        txHash
      }}</a>
      <span v-if="txHash === '.....'">....</span> in status
      {{ status }}
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TxStatus",
  props: ["blockExpUrl", "txIndex"],
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("contracts", ["getContractData"]),
    isVisible() {
      const retVal = !this.hide && this.txIndex != -1;
      return retVal;
    },
    totalUrl() {
      return this.blockExpUrl.replace("address", "tx") + this.txHash;
    }
  },
  watch: {
    status() {
      if (this.status == "success") {
        const that = this;
        setTimeout(() => {
          that.setHide();
        }, 10000);
      }
    },
    txIndex() {
      this.hide = false;
    }
  },
  methods: {
    setHide() {
      this.hide = true;
    }
  },
  data() {
    return {
      status: "",
      txHash: "",
      hide: false,
      renderId: 0
    };
  },
  created() {
    var that = this;
    setInterval(() => {
      const state = that.drizzleInstance.store.getState();
      const txHash = state.transactionStack[that.txIndex];
      if (txHash && !txHash.startsWith("TEMP")) {
        const status = state.transactions[txHash].status;
        that.status = status;
        that.txHash = txHash;
      } else {
        if (txHash && txHash.startsWith("TEMP")) {
          that.status = "waiting confirmation";
          that.txHash = ".....";
        }
      }
    }, 500);
  }
};
</script>

<style></style>
