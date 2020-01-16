<template>
  <div>
    <p>
      This project allow to connect people who have ETH but have no programming
      skills with those who has programming skills but no ETH, so both can
      profit on Ethereum Network arbitrage opportunities.
    </p>
    <p>
      Any Smart Contract is capable of borrowing ETH from common pool as long as
      it returns all of it (with fee) before transaction ends. If Smart Contract
      fails to do so transaction will revert.
    </p>
    <p>
      For instance. Let say DAI price on Uniswap due to some big trade become 2%
      higher than on OASIS APP. You can try following
    </p>
    <ol>
      <li>Borrows Eth from Lender Smart Contract</li>
      <li>Sell ETH for DAI on OASIS APP</li>
      <li>Buy ETH for DAI on Uniswap</li>
      <li>Repay Borrowed ETH</li>
    </ol>
    <p>
      It is often a case that You need to move around this way 10000 $ in order
      to earn 1$.
      <b
        >Thanks to this solution You do not need to own 10000 worth of ETH to
        make an arbitrage</b
      >
    </p>
    <p>
      Great thing about this operation is that or it will succeed and both smart
      contract and liquidity provider will profit, or it will fail (revert) and
      all that will be lost is transaction fees.
    </p>
    <b>
      This way ETH pooled in Smart Contract is never at risk, but still can be
      used and give profit.
    </b>
  </div>
</template>

<script>
export default {
  name: "ProjectDescription"
};
</script>

<style></style>
