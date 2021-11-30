const { BigNumber } = require("@ethersproject/bignumber");

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy(
    ethers.utils.parseEther("0.05"),
    "0xfeEb9546E9501f03aEc345fb4fbC8E255048C67d",
    "https://gateway.pinata.cloud/ipfs/QmajKi2cyxrGnTBjQuqYh2k6JjpLJP4jomaZTQirvDeXkW"
  );

  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
