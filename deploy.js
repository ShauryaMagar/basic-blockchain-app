const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
    'river congress where famous play cash omit depart crucial local volcano steak',
    'https://rinkeby.infura.io/v3/112c3a4353cc44789be029d2e117d1fa'
);
const web3 = new Web3(provider);
const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]); 
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments:['Hello!'] })
        .send({ gas:'1000000', from:accounts[0]});
    console.log("Contract Deployed at Address: ", result.options.address);
    provider.engine.stop();    // To prevent a hanging deployment
};
//0x018c03deC2f607D97387598Bf195032574e080E2
deploy();
