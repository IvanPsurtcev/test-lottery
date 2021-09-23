const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", () => {
  let Lottery, lottery;

  beforeEach(async () => {
    Lottery = await ethers.getContractFactory('Lottery');
    lottery = await Lottery.deploy();
  });

  describe('Bidding', () => {
    it('The betting is successful', async () => {
      await lottery.toBid({value: 50});
      const lotteryBalance = await lottery.balanceOf();
      expect(lotteryBalance).to.equal(50); 
    });

    // fail transaction 
    it('Should fail if the bet less than 1% of the lottery balance', async () => {
      await lottery.toBid({value: 110});
      await expect(lottery.toBid({value: 1})).to.be.revertedWith('The bid is too small');
    });
  });
});