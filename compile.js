const path = require('path');
const fs = require('fs');
const solc = require('solc');
const inboxPath = path.resolve(__dirname,"contracts","Inbox.sol");
const source = fs.readFileSync(inboxPath,'utf-8');
module.exports= solc.compile(source,1).contracts[':Inbox']; //2nd param is the number of contacts we wanna compile
