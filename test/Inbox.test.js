// contract test code will go here
const assert = require('assert') //make assertions about tests. built-in node library
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Web3 is constructor. Therefore capitalised. It creates an instance of web3
const web3 = new Web3(ganache.provider()); // craetes an instance of Web3 and tells to connect to local ganache network. 
const {interface, bytecode} = require('../compile');

let accounts;
let inbox; // js representation of the contract. We can call functions of contract using this variable.
const initial_string = "Hello"
beforeEach(async()=>{
    //get a list of all accs
    accounts = await web3.eth.getAccounts()     //almost every function we call using web3 are asynchronous.

    //use one of the accs to deploy the contracts
    inbox = await new web3.eth.Contract(JSON.parse(interface))    //tells web3 that there is a certain contract with certain interface.  
        .deploy({   //tells web3 that this type of contract is to be deployed
            data: bytecode,
            arguments: [initial_string]
        }) //1st arg- bytecode for deploy, 2nd arg- initial value that we wanna pass to constructor
        .send({
            from: accounts[0],
            gas: '1000000'
        }) //acc from which contract is to be deployed
});

describe('Deploy Inbox Contract',()=>{
    it('deploy a contract',()=>{
        assert.ok(inbox.options.address); //if address exists, it says true
    });
    it('has a default message', async ()=>{    //async as calling a function of a contract may take some time to respond.
        const message = await inbox.methods.message().call();
        assert(message, initial_string);
    });

    it('can change the message', async ()=>{
        // it returns transaction hash, so no need of storing it into any variable.
        await inbox.methods.setMessage('bye').send({ from:accounts[0] }); //as we're changing the content of blockchain, we need to pay and hence need to specify the acc
        const message = await inbox.methods.message().call();
        assert(message, 'bye');
    })
})

// demo code for mocha
// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// let car;
// beforeEach(()=>{
//     car = new Car();
// })
// describe('Car Class',()=>{
//     it('park should return string', ()=>{
//         assert(car.park(), 'stopped'); // 1st arg- value that the code produces. 2nd arg- value that is expected.
//     })
//     it('drive should return a string', ()=>{
//         assert(car.drive(), 'vroom');
//     })
// })    //1st arg- used for us. For classification. 2nd arg- function to test