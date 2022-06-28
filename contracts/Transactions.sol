//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Transactions is ReentrancyGuard, Ownable {
    uint256 public transactionCount;
    uint256 public feePercent;
    address payable public feeAccount;

    ///@dev Event emitted when a transaction is added
    ///@param from address of the sender
    ///@param receiver address of the receiver
    ///@param amount amount of transfered ETH
    ///@param transactionFee amount of the transaction fee paid
    ///@param message message of the transaction
    ///@param keyword gif keyword of the transaction
    ///@param timestamp time of the transaction
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        uint256 transactionFee,
        string message,
        string keyword,
        uint256 timestamp
    );

    ///@dev Struct of transaction
    ///@param from address of the sender
    ///@param receiver address of the receiver
    ///@param amount amount of transfered ETH
    ///@param transactionFee amount of the transaction fee paid
    ///@param message message of the transaction
    ///@param keyword gif keyword of the transaction
    ///@param timestamp time of the transaction
    struct TransferStruct {
        address from;
        address payable receiver;
        uint256 amount;
        uint256 transactionFee;
        string message;
        string keyword;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    ///@dev Constructor
    ///@param _feePercent amount of ETH to be paid as transaction fee
    constructor(uint256 _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    ///@dev Function to calculate length of a string
    ///@param _word string to be calculated length
    ///@return number of the string length
    function getStringLength(string memory _word)
        internal
        pure
        returns (uint256)
    {
        uint256 len = bytes(_word).length;
        return len;
    }

    ///@dev Function
    ///@param receiver address of the receiver
    ///@param amount amount of transfered ETH
    ///@param message message of the transaction
    ///@param keyword gif keyword of the transaction
    ///@notice nonReentrant modifier is used to prevent reentrancy
    function addTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public payable nonReentrant {
        require(amount > 0, "Wrong transaction value");
        require(
            getStringLength(message) >= 3,
            "Minimum message length should be 3"
        );
        require(
            getStringLength(keyword) >= 3,
            "Minimum keyword length should be 3"
        );
        require(receiver != msg.sender, "You cannot transfer to yourself");

        transactionCount++;
        uint256 transactionFee = (amount * feePercent) / 100;

        receiver.transfer(amount - transactionFee);
        feeAccount.transfer(transactionFee);

        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount - transactionFee,
                transactionFee,
                message,
                keyword,
                block.timestamp
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount - transactionFee,
            transactionFee,
            message,
            keyword,
            block.timestamp
        );
    }

    ///@dev Function to change the fee percent
    ///@param _newFee amount of ETH to be paid as transaction fee
    function changeFeeValue(uint256 _newFee) public onlyOwner {
        feePercent = _newFee;
    }

    ///@dev Function to get the transaction array
    ///@return array of the transactions
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    ///@dev Function to get the transaction count
    ///@return number of the transactions count
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
