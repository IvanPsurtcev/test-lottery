const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", () => {
  let Lottery, lottery, addrLottery, addrBidder;

  beforeEach(async () => {
    Lottery = await ethers.getContractFactory('Lottery');
    lottery = await Lottery.deploy();
    [addrLottery, addrBidder] = await ethers.getSigners();
  });

  describe('Bidding', () => {
    it('The betting is successful', async () => {
      await lottery.toBid().contract.method(addrLottery, addrBidder, {value: 50}); //TODO
      const lotteryBalance = await lottery.balanceOf();
      expect(lotteryBalance).to.equal(50); //TODO
    });
  });
});