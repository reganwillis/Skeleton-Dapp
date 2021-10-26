pragma solidity ^0.5.0;

// This smart contract has uint data and basic functions
// to get and set data on the blockchain.
contract SmartContract {
    uint public data;

    // set data
    function set_data(uint _data) public {
        data = _data;
    }

    // get data
    function get_data() view public returns(uint) {
        return data;
    }
}