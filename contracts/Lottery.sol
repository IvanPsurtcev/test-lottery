// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Lottery {
    // time of the last bet
    uint public lotteryTime;
    
    // balance of lottery
    uint public allBank;

    uint public bid;
    address public lastBidder;

    mapping (address => uint) balances;

    event Bid(address lastbidder, uint bid);
    event Win(address lastbidder, uint amount);

    modifier OnlyLastBidder() {
        require (msg.sender == lastBidder);
        _;
    }

    // function for lottery betting
    function toBid() public payable {
        //console.log("Bid is %s", balances[msg.sender]);
        bid = msg.value;
        allBank = address(this).balance;

        // bet condition
        require(bid != 0 && bid >= allBank - (99 * allBank) / 100);        
        balances[msg.sender] += msg.value;
        lotteryTime = block.timestamp;
        lastBidder = msg.sender;
        emit Bid(msg.sender, msg.value);
    }

    // function for viewing lottery balance
    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }

    // function for the lottery winner
    function withdraw() public OnlyLastBidder payable {
        uint amount = 9 * (address(this).balance) / 10;
        
        // condition for victory
        require (block.timestamp > lotteryTime + 3600, "The time has not yet passed");
        allBank -= amount;
        payable(msg.sender).transfer(amount);

        // the winner can withdraw again after an hour
        lotteryTime = block.timestamp;
        emit Win(msg.sender, amount);
    }
}