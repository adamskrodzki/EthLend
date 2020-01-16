<template>
  <div v-cloak>
    <div class="section" v-if="!isEthereum">
      To use all capabilities of this project use web3 provider like Metamask
    </div>
    <div class="section" v-if="isDrizzleInitialized && isEthereum">
      <IncorrectNetworkInfo v-if="supportedNetwork == false" />
      <CurrentNetwork v-on:networkFound="setupNetwork" />
    </div>
    <el-tabs type="card">
      <el-tab-pane label="What is it?">
        <ProjectDescription />
      </el-tab-pane>
      <el-tab-pane label="Haw to use It?">
        <FaqDescription
          v-bind:supportedNetwork="supportedNetwork"
          v-bind:blockExpUrl="etherscanUrl"
        />
      </el-tab-pane>
      <el-tab-pane label="Pool ETH" v-if="isDrizzleInitialized && isEthereum">
        <div class="section" v-if="supportedNetwork">
          <DepositETH v-bind:blockExpUrl="etherscanUrl" />
        </div>

        <div class="section" v-if="supportedNetwork">
          <WithdrawEth v-bind:blockExpUrl="etherscanUrl" />
        </div>
        <div class="section" v-if="supportedNetwork">
          <ContractBalance v-bind:blockExpUrl="etherscanUrl" />
        </div>
        <div class="section" v-if="supportedNetwork && account">
          <UsersBalance
            v-bind:blockExpUrl="etherscanUrl"
            v-bind:activeAccount="account"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CurrentNetwork from "./CurrentNetwork";
import ContractBalance from "./ContractBalance";
import IncorrectNetworkInfo from "./IncorrectNetworkInfo";
import DepositETH from "./DepositETH";
import UsersBalance from "./UsersBalance";
import WithdrawEth from "./WithdrawETH";
import FaqDescription from "./FaqDescription";
import ProjectDescription from "./ProjectDescription";
import { mapGetters } from "vuex";
import ExampleCaller from "./contracts/ExampleCaller.json";
import TxLendToken from "./contracts/TxLendToken.json";
import options from "./drizzleOptions";

export default {
  name: "app",
  components: {
    CurrentNetwork,
    ContractBalance,
    DepositETH,
    UsersBalance,
    WithdrawEth,
    IncorrectNetworkInfo,
    ProjectDescription,
    FaqDescription
  },
  watch: {
    activeAccount(prevVal, newVal) {
      // eslint-disable-next-line
      console.log("new account", prevVal, newVal);
    }
  },

  methods: {
    setupNetwork(event) {
      // eslint-disable-next-line
      console.log("Setting up network", event.name);
      if (event.name == "Rinkeby" || event.name == "Kovan") {
        //TODO Add Contract on suppported network
        try {
          this.drizzleInstance.addContract(
            TxLendToken,
            options.events["TxLendToken"]
          );
          this.drizzleInstance.addContract(ExampleCaller, []);
        } catch (e) {
          //
        }
        this.supportedNetwork = true;
      }
      if (event.name == "Rinkeby") {
        this.etherscanUrl = "https://rinkeby.etherscan.io/address/";
      }
      if (event.name == "Kovan") {
        this.etherscanUrl = "https://kovan.etherscan.io/address/";
      }
    }
  },

  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount"])
  },
  mounted: function() {
    if (window.ethereum) {
      window.ethereum.enable().then(() => {
        // eslint-disable-next-line
        console.log("enable arguments", arguments);
        this.isEthereum = true;
      });
    } else {
      this.isEthereum = false;
      return;
    }
    window.ethereum.on("accountsChanged", accounts => {
      // eslint-disable-next-line
      if (this.account) {
        document.location.reload();
      }

      this.account = accounts[0];
    });
    this.$drizzleEvents.$on("drizzle/contractEvent", payload => {
      // eslint-disable-next-line
      console.log("event catched", payload);
      this.account = this.activeAccount;
    });
  },
  data() {
    return {
      etherscanUrl: "invalid",
      supportedNetwork: false,
      account: undefined,
      isEthereum: false
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-button {
  min-width: 10em;
}
</style>
