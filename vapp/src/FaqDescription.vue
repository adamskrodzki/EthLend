<template>
  <div>
    <p><b>How to use it?</b></p>
    <p>
      You can go to "Pool ETH" tab <b>(web3 required)</b> and add Your ETH to
      the pool or remove one you have added before
    </p>
    <p>
      You can also interact with example Smart Contract that uses this solution
      (InTxLend) in order to take Eth from the pool use it and return with
      interests. You can observe how It increases value of pool share tokens
      <b>(web3 required)</b>
    </p>
    <div v-if="supportedNetwork">
      <RunExample v-bind:blockExpUrl="blockExpUrl" />
    </div>
    <hr />
    <p>
      please visit
      <a href="https://github.com/adamskrodzki/EthLend/">Github Repository</a>
      and register any issues You came up with
    </p>
  </div>
</template>

<script>
import RunExample from "./RunExample";
export default {
  props: ["supportedNetwork", "blockExpUrl"],
  name: "FaqDescription",
  components: {
    RunExample
  }
};
</script>

<style></style>
