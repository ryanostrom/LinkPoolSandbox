// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "@chainlink/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol";

contract PriceFeed {

  AggregatorV3Interface internal priceFeed;

  constructor(address AccountAddress) {
      priceFeed = AggregatorV3Interface(AccountAddress);
  }

  function getLatestPrice() public view returns (int) {
    ( , int price, , , ) = priceFeed.latestRoundData();
    return price;
  }
}
