const ExpenseTracker = artifacts.require("./ExpenseTracker.sol");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Expense Tracker', ([deployer, recipient, payer]) => {
    let expenseTracker
  
    before(async () => {
        expenseTracker = await ExpenseTracker.deployed()
    })
  
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await expenseTracker.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
  
        it('has a name', async () => {
            const name = await expenseTracker.name()
            assert.equal(name, 'Expense Tracker')
        })
  
    })

    describe('transaction', async () => {

        it('has balance', async () => {
            let oldRecipientBalance
            oldRecipientBalance = await web3.eth.getBalance(recipient)
            oldRecipientBalance = new web3.utils.BN(oldRecipientBalance)

            result = await expenseTracker.sendMoney(recipient, { from: payer, value: web3.utils.toWei('1', 'Ether')});

            const event = result.logs[0].args
            assert.equal(event.payer, payer, 'Sender address is correct')
            assert.equal(event.recipient, recipient, 'Recipient addrss is correct')
            assert.equal(event.amount, '1000000000000000000', 'price is correct')

            let newRecipientBalance
            newRecipientBalance = await web3.eth.getBalance(recipient)
            newRecipientBalance = new web3.utils.BN(newRecipientBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            const exepectedBalance = oldRecipientBalance.add(price)
            assert.equal(newRecipientBalance.toString(), exepectedBalance.toString())
        })
    })
})