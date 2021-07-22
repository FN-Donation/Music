var constant = require('./constant.js');
//------------------------
// Web3 Connect
//------------------------
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const mainAddress = constant.mainAddress;
const makerAddress = constant.makerAddress;
const eoaAddress = constant.eoaAddress;
const TokenContractAddress = constant.TokenContractAddress;
const crowdFundContractAddress = constant.crowdFundContractAddress;

//------------------------
// Smart Contract Connect
//------------------------
// Token Contract
var walletTokenAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var TokenContract = web3.eth.contract(walletTokenAbi).at(TokenContractAddress);

// crowdFund Contract
var crowdFundAbi = [
   {
      "constant": false,
      "inputs": [],
      "name": "checkGoalReached",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "ended",
      "outputs": [
         {
            "name": "",
            "type": "bool"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "totalAmount",
      "outputs": [
         {
            "name": "",
            "type": "uint256"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "goalAmount",
      "outputs": [
         {
            "name": "",
            "type": "uint256"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "deadline",
      "outputs": [
         {
            "name": "",
            "type": "uint256"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": false,
      "inputs": [],
      "name": "kill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "tokenReward",
      "outputs": [
         {
            "name": "",
            "type": "address"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [
         {
            "name": "",
            "type": "address"
         }
      ],
      "name": "balanceOf",
      "outputs": [
         {
            "name": "",
            "type": "uint256"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "goalReached",
      "outputs": [
         {
            "name": "",
            "type": "bool"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
         {
            "name": "",
            "type": "address"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": true,
      "inputs": [],
      "name": "price",
      "outputs": [
         {
            "name": "",
            "type": "uint256"
         }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
   },
   {
      "constant": false,
      "inputs": [],
      "name": "safeWithdrawal",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "name": "_tokenAddress",
            "type": "address"
         }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
   },
   {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": false,
            "name": "ownerAddress",
            "type": "address"
         },
         {
            "indexed": false,
            "name": "amountRaisedValue",
            "type": "uint256"
         }
      ],
      "name": "GoalReached",
      "type": "event"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": false,
            "name": "backer",
            "type": "address"
         },
         {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
         },
         {
            "indexed": false,
            "name": "isContribution",
            "type": "bool"
         }
      ],
      "name": "FundTransfer",
      "type": "event"
   }
];
var CrowdFundContract = web3.eth.contract(crowdFundAbi).at(crowdFundContractAddress);

web3.eth.defaultAccount = web3.eth.accounts[0];

//-------------------------------------
// GetToken  (TokenContract : BalanceOf)
//-------------------------------------
exports.getTokenAmount = function (address) {
    //+++++++  STEP 4. Get 실습 ++++++++++++
    //return -1;
    return TokenContract.balanceOf(address);
};

//-------------------------------------
// getEther (CrowdFund : BalanceOf)
//-------------------------------------
exports.getFundAmount = function (address) {
    //+++++++  STEP 4. Get Exercise ++++++++++++
    //return -2;
    return CrowdFundContract.balanceOf(address);
};

//-------------------------------------
// getEther (Web3)
//-------------------------------------
exports.getBalance = function (address) {
    //+++++++  STEP 4. Get Exercise ++++++++++++
    //return -3;
    return web3.fromWei(web3.eth.getBalance(address), 'ether');
};

//----------------------------
// unlockAccount (Web3)
//----------------------------
exports.unlockAccount = function (from, passphase, callback) {
    web3.personal.unlockAccount(from, passphase, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* unlock : " + from + ', ' + passphase );
            return callback(null, hash);
        }
    });
};

//----------------------------
// sendTransaction (Web3)
//----------------------------
exports.sendTransaction = function(from, to, value, gas, callback) {
    //+++++++  STEP 4. SET Exercise ++++++++++++
    web3.eth.sendTransaction({
        to: to,
        from: from,
        value: web3.toWei(value,'ether'),
        gas: gas}, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* sendTransaction txhash : " + hash );
            return callback(null, hash);
        }
    });
};

//----------------------------
// sendTransaction (Web3)
//----------------------------
exports.safeWithdraw = function(callback) {
  //+++++++  STEP 4. SET Exercise ++++++++++++
CrowdFundContract.checkGoalReached(
   function(err){
      if(err) {
         console.log(err);
         return callback(err,'');
      }else {
         console.log('success checkGoalReached');
         return callback(null);
        }
   }   
);

  CrowdFundContract.safeWithdrawal(
    function (err, hash) {
        if (err) {
          console.log(err);
          return callback(err, '');
        } else {
          console.log("* safeWithdrawl txhash : " + hash);
          return callback(null, hash);
        }
    }
  );
};

//----------------------------
// Event Monitoring (CrowdFund)
//----------------------------
exports.fundTransferEvent = function( callback ) {
    //+++++++  STEP 5. Event Watch Exercise ++++++++++++
    //return callback(null,null);
    CrowdFundContract.FundTransfer().watch(function(err, res){
        if (err)
        {
            console.log(err);
            return callback(err, '');
        } else
        {
            console.log(res);
            return callback(null, res);
        }
    });
};