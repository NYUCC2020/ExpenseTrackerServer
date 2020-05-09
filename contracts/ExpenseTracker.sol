pragma solidity >=0.4.21 <0.7.0;

contract ExpenseTracker {
    string public name;
    mapping(uint => Transaction) public transactions;

    struct Transaction {
        address payable payer;
        address payable recipient;
        uint amount;
    }

    event MoneySent(
        address payable payer,
        address payable recipient,
        uint amount
    );

    constructor() public {
        name = "Expense Tracker";
    }

    function sendMoney(address payable recipient) public payable {
        require(recipient != msg.sender, "Require payer is not the recipient");

        recipient.transfer(msg.value);

        emit MoneySent(msg.sender, recipient, msg.value);
    }
}