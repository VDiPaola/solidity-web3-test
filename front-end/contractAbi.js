const contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_attackerId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_defenderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_stat",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "won",
				"type": "bool"
			}
		],
		"name": "Compare",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "pixels",
				"type": "string"
			}
		],
		"name": "PictureCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_prevOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "TransferOwnerEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_id2",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_stat",
				"type": "string"
			}
		],
		"name": "compare",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pixels",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createPicture",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "transferOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPicture",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getPictureCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPictureOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]