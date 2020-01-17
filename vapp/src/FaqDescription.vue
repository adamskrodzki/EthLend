<template>
  <div>
    <p><b>How to use it?</b></p>
    <p>
      You can go to "Pool ETH" tab <b>(web3 required)</b> and add Your ETH to
      the pool or remove one you have added before
    </p>
    <p v-if="isDrizzleInitialized">
      You can also interact with
      <a v-bind:href="exampleUrl" target="_blank">example Smart Contract</a>
      that uses this solution (InTxLend) in order to take Eth from the pool use
      it and return with interests. You can observe how It increases value of
      pool share tokens
      <b>(web3 required)</b>
    </p>
    <div v-if="supportedNetwork">
      <RunExample v-bind:blockExpUrl="blockExpUrl" />
    </div>
    <hr />
    <p>
      please visit
      <a href="https://github.com/adamskrodzki/EthLend/" target="_blank"
        >Github Repository</a
      >
      and register any issues You came up with
    </p>
  </div>
</template>

<script>
import RunExample from "./RunExample";
import { mapGetters } from "vuex";
export default {
  props: ["supportedNetwork", "blockExpUrl"],
  name: "FaqDescription",
  components: {
    RunExample
  },
  computed: {
    ...mapGetters("contracts", ["contractInstances"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    exampleUrl() {
      if (!this.isDrizzleInitialized || !this.contractInstances.ExampleCaller)
        return "";
      const url = this.drizzleInstance.contracts["ExampleCaller"].address;
      return this.blockExpUrl + url; //this.contractInstances.ExampleCaller.address;
    }
  }
};
</script>

<style></style>
