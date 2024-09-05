// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GEERAAF is ERC20, ERC20Burnable, Ownable {


    uint public initialSupply = 10000000000 ether;
    uint public perDay_mintPercentage = 0.27 ether;
    // mapping (uint=>uint) public per_day_supply;
    uint public perDayCount;
    address public staking_cont_add;
    uint public launch_time;

    constructor(address initialOwner)
        ERC20("GEERAAF", "GEE")
        Ownable(initialOwner)
    {
        _mint(msg.sender, initialSupply);
        launch_time=block.timestamp;
    }

    function mint() public onlyOwner {

        uint _amount= initialSupply*perDay_mintPercentage/100 ether;
        _mint(staking_cont_add, _amount);

    }

    function update_mintPercentage(uint _val) public onlyOwner {

        perDay_mintPercentage=_val;
       
    }
        
    function update_staking_cont_add(address _add) public onlyOwner {

        staking_cont_add=_add;
       
    }
    
    function get_DaySupply(uint _day) public view returns(uint) {

        uint _amount;

        for(uint i=0;i<=_day;i++)
        {
            _amount+= (initialSupply*perDay_mintPercentage/100 ether);
        }

        return _amount;
    }
}
