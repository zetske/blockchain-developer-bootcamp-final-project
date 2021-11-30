# My project: Ticket Monster for ticket sales

My Ethereum Address: 
0x1169bA2A1E978e8215068baB33ef758142217E27
https://www.linkedin.com/in/anzette-muntingh-071408b7/

The frontend of this project is hosted on Vercel at https://bootcamp-ticket-monster.vercel.app/.
Screencast of the project: https://www.loom.com/share/7484195c835e49818562b65d98f888eb

## Selling tickets to concert/live events in the form of an NFT. 

Using my platform, the public will be able to purchase entrance tickets that will be stored as an NFT in their MetaMask wallet. This ensures less scams, reselling of fake tickets and safe ticket storage. This is also a way to support artists and organizations to accept crypto as payment. It cuts out the middle man and improves the ticket buying process. 

I have used 'Burning Man' as an event example for my project since I was inspired by the South African version (called Afrika Burn). This event is known to attract many open minded and extremely resourceful individuals and groups and this new method of ticket sales will resonate with their entire experience

### Directory structure

This repo consists of three main directories:
- app
- chain
- rinkeby

The app directory contains the complete frontend project which allows users to interact with their wallets and buy tickets. This is also the directory that has been deployed to Vercel.

The chain directory contains the Solidity contract(`chain/src`), deploy scripts optimised for local testing (`chain/deploy`) and contract tests(`chain/test`).

The rinkeby directory contains the hardhat config and scripts necessary to deploy the contract to rinkeby and add a minter.

The three directories have the following in common: They all use Node.js and contain a package.json from which dependencies can be installed by running `yarn install`.

...

#### Installation

Ensure you have Node.js and yarn installed on your system before you proceed with the setup for any of the child directories. 

For each of the child directories, copy the `env.example` file to a new file called `.env`.
To make this process easier for you, you can copy the script below and run it now to set up the environment for all directories.

```bash
cp app/.env.example app/.env
cp rinkeby/.env.example rinkeby/.env
```

You will now need to update all the `.env` files with a valid private key.The API has already been added as an environment variable so that you don't have to enter this yourself. 

#### For app

Change directory: `cd app`

You need to use nvm to set the node.js version to 16.11.1. When you are in any of the directories (app, chain or rinkeby) you can use the command `nvm use` to select the correct nvm version that is present in the .nvmrc file.

Once ready, run:
`yarn install` - to install all dependencies
`yarn dev` - to start up frontend server (note that there will be errors if you have not yet installed dependencies on the `chain` directory)

#### For chain

Change directory: `cd chain`

Once ready, run:

`yarn install` - to install all dependencies
`yarn hardhat compile` - to compile the contract
`yarn hardhat deploy` - to deploy the contract
`yarn test` - to run tests for contract

#### For rinkeby

Change directory: `cd rinkeby`

Once ready, run:

`yarn install` - to install all dependencies
`yarn copy-contract` - to get the contract ready
`yarn hardhat compile` - to compile the contract
`yarn hardhat deploy` - to deploy the contract
